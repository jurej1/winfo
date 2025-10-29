import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { getSwapTokensForChain } from "../../api/swap";
import { TokenDB } from "@w-info-sst/db";

type SwapTokenOptions = UseQueryOptions<TokenDB[], Error>;

export const useSwapTokens = (chainId: number, options?: SwapTokenOptions) => {
  const ONE_HOUR = 60 * 60 * 1000;

  return useQuery({
    queryKey: ["swap-tokens", chainId],
    queryFn: () => getSwapTokensForChain(chainId),
    gcTime: ONE_HOUR,
    staleTime: ONE_HOUR,
  });
};
