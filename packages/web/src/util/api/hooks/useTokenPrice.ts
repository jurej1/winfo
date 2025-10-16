import { useQuery } from "@tanstack/react-query";
import { fetchTokenMarketData } from "../functions/tokens";

export const useTokenPrice = (coin: string) => {
  const FIVE_MINUTES = 5 * 60 * 1000;

  return useQuery({
    queryKey: ["tokenMarketData", coin],
    queryFn: () => fetchTokenMarketData(coin),
    staleTime: FIVE_MINUTES,
    gcTime: FIVE_MINUTES,
  });
};
