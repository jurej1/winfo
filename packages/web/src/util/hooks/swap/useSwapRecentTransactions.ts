import { getRecentDexTransactions } from "@/util/api/swap";
import { useQuery } from "@tanstack/react-query";

export const useSwapRecentTransactions = (chainId?: number) => {
  return useQuery({
    queryKey: ["dex-recent-transactions", chainId],
    queryFn: () => getRecentDexTransactions(chainId!),
    enabled: !!chainId,
  });
};
