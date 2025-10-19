import { useQuery } from "@tanstack/react-query";
import { Address } from "viem";
import { fetchWalletNetWorth } from "../functions/wallet";

export const useWalletNetWorth = (address: Address) => {
  return useQuery({
    queryKey: ["wallet-net-worth", address],
    queryFn: () => fetchWalletNetWorth(address),
  });
};
