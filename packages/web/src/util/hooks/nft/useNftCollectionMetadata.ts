import { useQuery } from "@tanstack/react-query";
import { fetchNftContractMetadata } from "../../api/nfts";

export const useNftCollectionMetadata = (address: string) => {
  const ONE_HOUR = 60 * 60 * 1000;

  return useQuery({
    queryKey: ["nftCollectionMetadata", address],
    queryFn: () => fetchNftContractMetadata(address),
    gcTime: ONE_HOUR,
    staleTime: ONE_HOUR,
  });
};
