"use client";

import { useSwapStore } from "@/util/hooks/swap/useSwapStore";
import { useMemo } from "react";
import { useAccount } from "wagmi";
import { formatUnits } from "viem";

export function DexNetworkCost() {
  const { chain } = useAccount();

  const totalNetworkFee = useSwapStore((state) => state.price?.totalNetworkFee);

  const formattedAmount = useMemo(() => {
    if (!totalNetworkFee || !chain?.nativeCurrency) return null;

    const { decimals, symbol } = chain.nativeCurrency;

    const amountString = formatUnits(BigInt(totalNetworkFee), decimals);

    return `${amountString} ${symbol}`;
  }, [totalNetworkFee, chain?.nativeCurrency]);

  if (!formattedAmount) return <></>;

  return (
    <div className="flex w-full justify-between">
      <span>Network cost:</span>
      <span>{formattedAmount}</span>
    </div>
  );
}
