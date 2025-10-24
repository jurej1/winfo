import { useQuery } from "@tanstack/react-query";
import { Address } from "viem";
import { fetchWalletNetWorth } from "../functions/wallet";

export const useWalletNetWorth = (address: Address) => {
  const ONE_HOUR = 60 * 60 * 1000;

  return useQuery({
    queryKey: ["wallet-net-worth", address],
    queryFn: () => fetchWalletNetWorth(address),
    gcTime: ONE_HOUR,
    staleTime: ONE_HOUR,
  });
};
