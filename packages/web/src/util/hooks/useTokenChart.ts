import { useQuery } from "@tanstack/react-query";
import { fetchTokenOHLC } from "../api/tokens";

export const useTokenChart = (coin: string) => {
  const FIVE_MINUTES = 5 * 60 * 1000;

  return useQuery({
    queryKey: ["tokenMarketData", coin],
    queryFn: () => fetchTokenOHLC(coin),
    staleTime: FIVE_MINUTES,
    gcTime: FIVE_MINUTES,
  });
};
