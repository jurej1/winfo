import { CreateOneInchOrderParams } from "@w-info-sst/types";
import { useCallback, useEffect, useState } from "react";
import { useLimitOrderCreate } from "./useLimitOrderCreate";
import {
  useAccount,
  useReadContract,
  useSignTypedData,
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

export enum LimitOrderStatus {
  initial,
  checkAllowanceAndApprove,
  createLimitOrder,
  signLimitOrder,
  submitLimitOrder,
  done,
  error,
}

export const useLimitOrderExecute = ({
  order,
  sellToken,
}: UseLimitOrderExecuteProps) => {
  const [isPending, setIsPending] = useState(false);

  const { mutateAsync: createLimitOrder } = useLimitOrderCreate();

  const { address, chainId } = useAccount();

  const { writeContractAsync } = useWriteContract();

  const { data: allowanceResponse } = useReadContract({
    address: sellToken?.address,
    chainId: chainId,
    functionName: "allowance",
    args: [
      address!,
      getLimitOrderV4Domain(chainId!).verifyingContract as Address,
    ],
    abi: erc20Abi,
    query: {
      enabled: !!sellToken?.address && !!chainId && !!address,
    },
  });

  const { mutateAsync: submitLimitOrder } = useLimitOrderSubmit();

  const { signTypedDataAsync } = useSignTypedData();

  const [status, setStatus] = useState<LimitOrderStatus>(
    LimitOrderStatus.initial,
  );

  const approveSpender = useCallback(async () => {
    if (!sellToken || !order?.chainId) {
      throw Error("icomplete-data");
    }

    const spenderAddress = getLimitOrderV4Domain(order.chainId)
      .verifyingContract as Address;

    // TODO -> wait for "Approve" write to succeed before continuating with code,
    await writeContractAsync({
      address: sellToken.address,
      abi: erc20Abi,
      functionName: "approve",
      args: [spenderAddress, maxUint256],
    });
  }, [sellToken, order?.chainId]);

  const checkAllowanceAndApproveIfNeeded = useCallback(async () => {
    const sellingAmount = BigInt(order?.makingAmount ?? 0);
    const allowance = BigInt(allowanceResponse ?? 0);

    if (allowance < sellingAmount) {
      await approveSpender();
    }
  }, [order?.makingAmount, allowanceResponse, approveSpender]);

  const execute = useCallback(async () => {
    if (!order) return;

    setIsPending(true);
    await new Promise((resolve) => setTimeout(resolve, 200));

    try {
      // 1. Check Allowance & Approve if needed
      setStatus(LimitOrderStatus.checkAllowanceAndApprove);
      await checkAllowanceAndApproveIfNeeded();
      // adding delay for now
      await new Promise((resolve) => setTimeout(resolve, 300));

      // 2. Create Limit order
      setStatus(LimitOrderStatus.createLimitOrder);
      const createOrderResponse = await createLimitOrder(order);

      // 3. Sign Limit order
      setStatus(LimitOrderStatus.signLimitOrder);
      const { typedData, orderData, extension } = createOrderResponse;
      const signature = await signTypedDataAsync(typedData);

      //4. Submit Limit Order
      setStatus(LimitOrderStatus.submitLimitOrder);
      await submitLimitOrder({
        chainId: order.chainId,
        orderData,
        extension,
        signature,
      });
      setStatus(LimitOrderStatus.done);
    } catch (error) {
      setStatus(LimitOrderStatus.error);
      const isDenied =
        error instanceof UserRejectedRequestError ||
        error instanceof TransactionExecutionError;

      if (isDenied) {
        toast.error("Denied 😭");
      } else {
        toast.error("Failed to execute limit order");
      }
    } finally {
      setIsPending(false);
    }
  }, [
    setIsPending,
    order,
    createLimitOrder,
    submitLimitOrder,
    signTypedDataAsync,
    setIsPending,
    setStatus,
  ]);

  return {
    execute,
    isPending,
    status,
  };
};
