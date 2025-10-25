import { useQuery } from "@tanstack/react-query";
import { fetchTokenList } from "../api/tokens";

export const useTokensList = () => {
  const ONE_DAY = 24 * 60 * 60 * 1000;

  return useQuery({
    queryKey: ["tokensList"],
    queryFn: fetchTokenList,
    gcTime: ONE_DAY,
    staleTime: ONE_DAY,
  });
};
