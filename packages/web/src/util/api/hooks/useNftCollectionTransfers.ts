import { useQuery } from "@tanstack/react-query";
import { fetchNftCollectionTransfers } from "../functions/nfts";

export const useNftCollectionTransfers = (address: string) => {
  return useQuery({
    queryKey: ["nft-collection-transactions", address],
    queryFn: () => fetchNftCollectionTransfers(address),
  });
};
