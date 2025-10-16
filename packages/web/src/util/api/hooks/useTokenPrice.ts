import { useQuery } from "@tanstack/react-query";
import { fetchTokenOHLC } from "../functions/tokens";

export const useTokenPrice = (coin: string) => {
  const FIVE_MINUTES = 5 * 60 * 1000;

  return useQuery({
    queryKey: ["tokenMarketData", coin],
    queryFn: () => fetchTokenOHLC(coin),
    staleTime: FIVE_MINUTES,
    gcTime: FIVE_MINUTES,
  });
};
