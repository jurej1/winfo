import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { getSwapTokensForChain } from "../api/swap";
import { TokenDBwithPrice } from "@w-info-sst/db";
import { useAccount } from "wagmi";

type SupportedTokenOptions = UseQueryOptions<TokenDBwithPrice[], Error>;

export const useSupportedTokens = (options?: SupportedTokenOptions) => {
  const ONE_HOUR = 60 * 60 * 1000;

  const { chainId } = useAccount();

  return useQuery({
    queryKey: ["swap-tokens", chainId],
    queryFn: () => getSwapTokensForChain(chainId!),
    gcTime: ONE_HOUR,
    staleTime: ONE_HOUR,
    enabled: !!chainId,
    ...options,
  });
};
