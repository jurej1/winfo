import { fetchWalletHistory } from "@/util/api/wallet";
import { useQuery } from "@tanstack/react-query";
import { Address } from "viem";

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
