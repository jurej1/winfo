import { fetchLimitOrdersForWalelt } from "@/util/api/limit-orders";

import { useQuery } from "@tanstack/react-query";

import { useAccount } from "wagmi";

export const useLimitOrderByWallet = () => {
  const ONE_HOUR = 60 * 60 * 1000;
  const { address, chainId } = useAccount();

  return useQuery({
    queryKey: ["limit-orders-by-wallet", address, chainId],
    queryFn: () => fetchLimitOrdersForWalelt(chainId!, address!),
    enabled: !!address && !!chainId,
    gcTime: ONE_HOUR,
    staleTime: ONE_HOUR,
  });
};
