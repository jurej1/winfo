"use client";

import { useWalletNetWorth } from "@/util/api/hooks/useWalletNetWorth";
import { Address } from "viem";

type Props = {
  address: Address;
};

export function NetWorthCard({ address }: Props) {
  const { data, isLoading, error } = useWalletNetWorth(address);

  return (
    <div className="m-2 h-full w-full rounded-2xl border p-3 shadow">
      {isLoading && <span>LOADING...</span>}
      {data && (
        <div className="flex h-full flex-col items-center justify-center font-bold">
          <div>Total Net Worth: {data.total_networth_usd} USD</div>
          <div>Native Balance {data.chains[0].native_balance_usd} USD</div>
          <div>Token Balance {data.chains[0].token_balance_usd} USD</div>
        </div>
      )}
    </div>
  );
}
