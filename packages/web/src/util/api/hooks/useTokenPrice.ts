import { useQuery } from "@tanstack/react-query";
import { fetchTokenMarketData } from "../functions/tokens";

export const useTokenPrice = (coin: string) => {
  return useQuery({
    queryKey: ["chartData"],
    queryFn: () => fetchTokenMarketData(coin),
  });
};
