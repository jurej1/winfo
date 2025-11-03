import { ONE_INCH_ROUTER_V6_ABI } from "@/lib/web3/one-inch-router-v6-abi";
import {
  getLimitOrderV4Domain,
  LimitOrderApiItem,
} from "@1inch/limit-order-sdk";
import { useCallback, useEffect, useState } from "react";
import { Address } from "viem";
import {
  useAccount,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";

import { toast } from "sonner";

type UseLimitOrderCancelProps = {
  limitOrder: LimitOrderApiItem;
};

export const useLimitOrderCancel = ({
  limitOrder,
}: UseLimitOrderCancelProps) => {
  const { chainId, address } = useAccount();

  const [cancelHash, setCancelHash] = useState<Address | undefined>();

  const [isPending, setIsPending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const { data: cancelTransactionReceipt, status: cancelOrderReceiptStatus } =
    useWaitForTransactionReceipt({
      hash: cancelHash,
      chainId: chainId,
      query: {
        enabled: !!cancelHash,
      },
    });

  const { writeContract } = useWriteContract({
    mutation: {
      onSuccess: (hash) => setCancelHash(hash),
      onError: (error) => {
        setIsPending(false);
        toast.error("Sorry there was an error canceling Limit Order");
      },
    },
  });

  const cancelOrder = useCallback(() => {
    if (!chainId) {
      toast.error("Network is not defined");
      return;
    }

    setIsPending(true);
    const contractAddress = getLimitOrderV4Domain(chainId).verifyingContract;

    const makerTraits = limitOrder.data.makerTraits;
    const orderHash = limitOrder.orderHash;

    writeContract({
      abi: ONE_INCH_ROUTER_V6_ABI,
      functionName: "cancelOrder",
      address: contractAddress as Address,
      account: address,
      args: [makerTraits, orderHash],
    });
  }, [chainId, address, setIsPending]);

  useEffect(() => {
    if (cancelOrderReceiptStatus === "error") {
      setIsPending(false);
      toast.error("There was an error canceling Limit Order");
    }

    if (cancelOrderReceiptStatus === "success") {
      setIsPending(false);
      toast.success("Successfully Cancelled Limit Order");
    }
  }, [cancelOrderReceiptStatus, setIsPending]);

  return {
    isPending,
    cancelOrder,
    isSuccess,
  };
};
