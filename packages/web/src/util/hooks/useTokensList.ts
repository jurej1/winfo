import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchTokenList } from "../api/tokens";

export const useTokensList = () => {
  const ONE_DAY = 24 * 60 * 60 * 1000;

  return useInfiniteQuery({
    queryKey: ["tokensList"],
    queryFn: ({ pageParam }) => fetchTokenList(pageParam),
    gcTime: ONE_DAY,
    staleTime: ONE_DAY,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      if (lastPage.length === 0) return undefined;

      return lastPageParam + 1;
    },
    getPreviousPageParam: (firstPage, allPages, firstPageParam) => {
      if (firstPageParam <= 1) {
        return undefined;
      }
      return firstPageParam - 1;
    },
  });
};
