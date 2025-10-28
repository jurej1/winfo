import { useQuery } from "@tanstack/react-query";
import { getSwapTokensForChain } from "../../api/swap";

export const useSwapTokens = (chainId: number) => {
  const ONE_DAY = 24 * 60 * 60 * 1000;

  return useQuery({
    queryKey: ["swap-tokens", chainId],
    queryFn: () => getSwapTokensForChain(chainId),
    gcTime: ONE_DAY,
    staleTime: ONE_DAY,
  });
};
