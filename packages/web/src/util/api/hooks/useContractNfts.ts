import { useQuery } from "@tanstack/react-query";
import { fetchContractNFTs } from "../functions/nfts";

export const useContractNFTs = (address: string) => {
  return useQuery({
    queryKey: ["contractNFTs", address],
    queryFn: () => fetchContractNFTs(address),
  });
};
