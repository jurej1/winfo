import { CreateOneInchOrderParams } from "@w-info-sst/types";
import { useCallback, useEffect, useState } from "react";
import { useLimitOrderCreate } from "./useLimitOrderCreate";
import {
  useAccount,
  useReadContract,
  useSignTypedData,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { useLimitOrderSubmit } from "./useLimitOrderSubmit";

import { getLimitOrderV4Domain } from "@1inch/limit-order-sdk";

import { toast } from "sonner";
import {
  Address,
  ChainDisconnectedError,
  erc20Abi,
  maxUint256,
  TransactionExecutionError,
  UserRejectedRequestError,
} from "viem";
import { TokenDBwithPrice } from "@w-info-sst/db";

type UseLimitOrderExecuteProps = {
  order: CreateOneInchOrderParams | undefined;
  sellToken: TokenDBwithPrice | undefined;
};

export const useLimitOrderExecute = ({
  order,
  sellToken,
}: UseLimitOrderExecuteProps) => {
  const [loading, setLoading] = useState(false);

  const { mutateAsync: createLimitOrder } = useLimitOrderCreate();

  const { address } = useAccount();

  const { writeContractAsync } = useWriteContract();

  const [approveHash, setApproveHash] = useState<`0x${string}` | undefined>();

  const { data: allowanceResponse } = useReadContract(
    !!sellToken?.address && !!order?.chainId && !!address
      ? {
          address: sellToken.address,
          chainId: order.chainId,
          functionName: "allowance",
          args: [
            address,
            getLimitOrderV4Domain(order.chainId).verifyingContract as Address,
          ],
          abi: erc20Abi,
          query: {
            refetchOnMount: true,
          },
        }
      : undefined,
  );

  const { mutateAsync: submitLimitOrder } = useLimitOrderSubmit();

  const { signTypedDataAsync } = useSignTypedData();

  const approveSpender = useCallback(async () => {
    if (!sellToken || !order?.chainId) {
      throw Error("icomplete-data");
    }

    const spenderAddress = getLimitOrderV4Domain(order.chainId)
      .verifyingContract as Address;

    const hash = await writeContractAsync({
      address: sellToken.address,
      abi: erc20Abi,
      functionName: "approve",
      args: [spenderAddress, maxUint256],
    });

    setApproveHash(hash);
  }, [sellToken, order?.chainId, setApproveHash]);

  const checkAllowanceAndApproveIfNeeded = useCallback(async () => {
    const sellingAmount = BigInt(order?.makingAmount ?? 0);
    const allowance = BigInt(allowanceResponse ?? 0);

    if (allowance < sellingAmount) {
      await approveSpender();
    }
  }, [order?.makingAmount, allowanceResponse, approveSpender]);

  const execute = useCallback(async () => {
    if (!order) return;
    setLoading(true);
    try {
      await checkAllowanceAndApproveIfNeeded();

      // 1. POST /limit-orders/create
      const createOrderResponse = await createLimitOrder(order);

      // 2. signTypedData
      const { typedData, orderData, extension } = createOrderResponse;

      const signature = await signTypedDataAsync(typedData);

      // 3. POST /limit-orders/submit
      // Send the serialized orderData and extension to reconstruct the order on the backend
      await submitLimitOrder({
        chainId: order.chainId,
        orderData,
        extension,
        signature,
      });
    } catch (error) {
      const isDenied =
        error instanceof UserRejectedRequestError ||
        error instanceof TransactionExecutionError;

      if (isDenied) {
        toast.error("Denied 😭");
      } else {
        toast.error("Failed to execute limit order");
      }
    } finally {
      setLoading(false);
    }
  }, [
    setLoading,
    order,
    createLimitOrder,
    submitLimitOrder,
    signTypedDataAsync,
    setLoading,
  ]);

  return {
    execute,
    isLoading: loading,
  };
};
