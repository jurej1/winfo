import { useQuery } from "@tanstack/react-query";
import { useAccount } from "wagmi";
import { fetchTokenBalancesByWallet } from "../functions/wallet";

export const useWalletBalance = () => {
  const { address } = useAccount();

  if (address) {
    const ONE_HOUR = 60 * 60 * 1000;

    return useQuery({
      queryKey: ["wallet-balance", address],
      queryFn: () => fetchTokenBalancesByWallet(address),
      gcTime: ONE_HOUR,
      staleTime: ONE_HOUR,
    });
  }

  return {
    data: undefined,
    error: undefined,
    isError: undefined,
    isLoading: false,
  };
};
