import { CreateOneInchOrderParams } from "@w-info-sst/types";
import { useCallback, useEffect, useState } from "react";
import { useLimitOrderCreate } from "./useLimitOrderCreate";
import {
  useSignTypedData,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { useLimitOrderSubmit } from "./useLimitOrderSubmit";

import { getLimitOrderV4Domain } from "@1inch/limit-order-sdk";

import { toast } from "sonner";
import {
  Address,
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

  const { writeContractAsync } = useWriteContract();

  const { mutateAsync: submitLimitOrder } = useLimitOrderSubmit();

  const { signTypedDataAsync } = useSignTypedData();

  const [approveHash, setApproveHash] = useState<Address | undefined>();

  const { isSuccess: isApproveSuccess } = useWaitForTransactionReceipt({
    hash: approveHash,
    query: {
      enabled: !!approveHash,
    },
  });

  const approveAmount = useCallback(async () => {
    if (!sellToken) return;

    const one_inch_contract = getLimitOrderV4Domain(56).verifyingContract;

    const hash = await writeContractAsync({
      address: sellToken.address,
      abi: erc20Abi,
      functionName: "approve",
      args: [one_inch_contract as Address, maxUint256],
    });
  }, [sellToken]);

  const execute = useCallback(async () => {
    if (!order) return;
    setLoading(true);
    try {
      await approveAmount();

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
