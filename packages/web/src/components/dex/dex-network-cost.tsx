"use client";

import { useSwapStore } from "@/util/hooks/swap/useSwapStore";
import { useMemo } from "react";
import { useAccount } from "wagmi";

export function DexNetworkCost() {
  const { chain } = useAccount();

  const { price } = useSwapStore();

  if (!price || !chain) return <></>;

  const { totalNetworkFee } = price;

  const formattedAmount = useMemo(() => {
    const { decimals, symbol } = chain.nativeCurrency;
    const amount = +totalNetworkFee / Math.pow(10, decimals);

    return `${amount} ${symbol}`;
  }, [chain.nativeCurrency, totalNetworkFee]);

  return (
    <div className="flex w-full justify-between">
      <span>Network cost:</span>
      <span>{formattedAmount}</span>
    </div>
  );
}
