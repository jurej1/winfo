"use client";

import { useSwap } from "@/util/hooks/swap/useSwap";
import { DexSwapCard } from "./dex-swap-card";
import { DexTokensRouteCard } from "./dex-tokens-route-card";

export function DexSwapComponent() {
  const swap = useSwap();

  const { quote, isFetchingQuote } = swap;

  return (
    <div className="flex flex-col gap-2">
      <DexSwapCard {...swap} />
      <DexTokensRouteCard isLoading={isFetchingQuote} quote={quote} />
    </div>
  );
}
