import { useQuery } from "@tanstack/react-query";
import { Address } from "viem";
import { fetchWalletHistory } from "../api/wallet";

export const useWalletHistory = ({
  address,
  cursor,
  chainId,
}: {
  address: Address;
  cursor?: string;
  chainId: number | undefined;
}) => {
  const ONE_HOUR = 60 * 60 * 1000;

  return useQuery({
    queryKey: ["wallet-history", address, cursor, chainId],
    queryFn: () => fetchWalletHistory(address, chainId, cursor),
    gcTime: ONE_HOUR,
    staleTime: ONE_HOUR,
  });
};
