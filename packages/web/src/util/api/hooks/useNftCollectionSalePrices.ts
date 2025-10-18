import { useQuery } from "@tanstack/react-query";
import { fetchNftSalePricesByCollection } from "../functions/nfts";

export const useNftCollectionSalePrices = (address: string) => {
  const ONE_DAY = 24 * 60 * 60 * 1000;

  return useQuery({
    queryKey: ["nft-collection-sale-prices", address],
    queryFn: () => fetchNftSalePricesByCollection(address),
    gcTime: ONE_DAY,
    staleTime: ONE_DAY,
  });
};
