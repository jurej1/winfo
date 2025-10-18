import { useQuery } from "@tanstack/react-query";
import { fetchContractNFTs } from "../functions/nfts";

export const useContractNFTs = (address: string) => {
  const ONE_HOUR = 60 * 60 * 1000;

  return useQuery({
    queryKey: ["contractNFTs", address],
    queryFn: () => fetchContractNFTs(address),
    gcTime: ONE_HOUR,
    staleTime: ONE_HOUR,
  });
};
