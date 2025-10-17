import { useQuery } from "@tanstack/react-query";
import { fetchNftContractMetadata } from "../functions/nfts";

export const useNftCollectionMetadata = (address: string) => {
  return useQuery({
    queryKey: ["nftCollectionMetadata", address],
    queryFn: () => fetchNftContractMetadata(address),
  });
};
