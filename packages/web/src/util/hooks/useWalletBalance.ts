import { useQuery } from "@tanstack/react-query";

import { Address } from "viem";
import { fetchTokenBalancesByWallet } from "../api/wallet";

export const useWalletBalance = (address: Address, chain: number) => {
  const TEN_MINUTES = 5 * 60 * 1000;

  return useQuery({
    queryKey: ["wallet-balance", address, chain],
    queryFn: () => fetchTokenBalancesByWallet(address, chain),
    gcTime: TEN_MINUTES,
    staleTime: TEN_MINUTES,
  });
};
