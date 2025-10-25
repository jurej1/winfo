import { useQuery } from "@tanstack/react-query";
import { fetchTokenOHLC } from "../api/tokens";
import { OHLCDaysFilter } from "@w-info-sst/types";

export const useTokenChart = (coin: string, days: OHLCDaysFilter) => {
  const FIVE_MINUTES = 5 * 60 * 1000;

  return useQuery({
    queryKey: ["tokenMarketData", coin, days],
    queryFn: () => fetchTokenOHLC(coin, days),
    staleTime: FIVE_MINUTES,
    gcTime: FIVE_MINUTES,
  });
};
