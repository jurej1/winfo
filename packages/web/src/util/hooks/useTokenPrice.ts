import { useQuery } from "@tanstack/react-query";
import { fetchTokenPrice } from "../api/tokens";

export const useTokenPrice = (coinId: string) => {
  const ONE_HOUR = 60 * 60 * 1000;

  return useQuery({
    queryKey: ["token-price-simple", coinId],
    queryFn: () => fetchTokenPrice(coinId),
    gcTime: ONE_HOUR,
    staleTime: ONE_HOUR,
  });
};
