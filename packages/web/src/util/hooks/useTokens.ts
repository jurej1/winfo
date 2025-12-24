import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { getSwapTokensForChain } from "../api/swap";
import { useAccount } from "wagmi";
import { SwingToken } from "@w-info-sst/types";

type UseTokenOptions = UseQueryOptions<SwingToken[], Error>;

export const useTokens = (options?: UseTokenOptions) => {
  const ONE_HOUR = 60 * 60 * 1000;

  const { chainId } = useAccount();

  return useQuery({
    queryKey: ["tokens", chainId],
    queryFn: () => getSwapTokensForChain(chainId!),
    gcTime: ONE_HOUR,
    staleTime: ONE_HOUR,
    enabled: !!chainId,
    ...options,
  });
};
