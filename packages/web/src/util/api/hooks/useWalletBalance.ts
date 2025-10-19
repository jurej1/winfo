import { useQuery } from "@tanstack/react-query";
import { useAccount } from "wagmi";
import { fetchTokenBalancesByWallet } from "../functions/wallet";
import { Address } from "viem";

export const useWalletBalance = (address: Address) => {
  const TEN_MINUTES = 10 * 60 * 1000;
  return useQuery({
    queryKey: ["wallet-balance", address],
    queryFn: () => fetchTokenBalancesByWallet(address),
    gcTime: TEN_MINUTES,
    staleTime: TEN_MINUTES,
  });
};
