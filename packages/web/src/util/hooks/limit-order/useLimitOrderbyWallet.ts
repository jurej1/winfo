import { fetchLimitOrdersForWalelt } from "@/util/api/limit-orders";
import { LimitOrderApiItem } from "@1inch/limit-order-sdk";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

export const useLimitOrderByWallet = () => {
  const ONE_HOUR = 60 * 60 * 1000;
  const { address, chainId } = useAccount();

  const [limitOrders, setLimitOrders] = useState<LimitOrderApiItem[]>([]);

  const { data, ...queryRest } = useQuery({
    queryKey: ["limit-orders-by-wallet", address, chainId],
    queryFn: () => fetchLimitOrdersForWalelt(chainId!, address!),
    enabled: !!address && !!chainId,
    gcTime: ONE_HOUR,
    staleTime: ONE_HOUR,
  });

  useEffect(() => {
    if (data) {
    }
  }, [data]);

  return {
    ...queryRest,
    limitOrders,
  };
};
