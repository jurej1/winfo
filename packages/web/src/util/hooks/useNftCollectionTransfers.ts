import { useQuery } from "@tanstack/react-query";
import { fetchNftCollectionTransfers } from "../api/nfts";

export const useNftCollectionTransfers = (address: string) => {
  const FIVE_MINUTES = 5 * 60 * 1000;

  return useQuery({
    queryKey: ["nft-collection-transactions", address],
    queryFn: () => fetchNftCollectionTransfers(address),
    gcTime: FIVE_MINUTES,
    staleTime: FIVE_MINUTES,
  });
};
