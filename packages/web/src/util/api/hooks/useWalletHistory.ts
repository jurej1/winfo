import { useQuery } from "@tanstack/react-query";
import { Address } from "viem";
import { fetchWalletHistory } from "../functions/wallet";

export const useWalletHistory = (address: Address, cursor?: string) => {
  const ONE_HOUR = 60 * 60 * 1000;

  return useQuery({
    queryKey: ["wallet-history", address, cursor],
    queryFn: () => fetchWalletHistory(address, cursor),
    gcTime: ONE_HOUR,
    staleTime: ONE_HOUR,
  });
};
