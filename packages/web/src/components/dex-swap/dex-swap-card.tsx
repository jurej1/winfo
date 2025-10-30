"use client";

import { useSwap } from "@/util/hooks/swap/useSwap";
import { useSwapStore } from "@/util/hooks/swap/useSwapStore";
import { useEffect } from "react";

import {
  DexSellCard,
  DexSwapTokensButton,
  DexCardHeader,
  DexConfirmSwapDialog,
  DexSwapCollapsibleInfo,
  DexTokenValueComparison,
  DexBuyCard,
} from "@/components/dex-swap";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

export function DexSwapCard() {
  const resetStore = useSwapStore((store) => store.resetStore);

  useSwap();
  // CLEANUP on DISPOSE
  useEffect(() => {
    return () => resetStore();
  }, [resetStore]);

  return (
    <Card className="mx-auto max-w-xl">
      <CardHeader>
        <DexCardHeader />
      </CardHeader>
      <CardContent className="relative flex flex-col gap-2">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <DexSwapTokensButton />
        </div>
        <DexSellCard />
        <DexBuyCard />
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-2">
        <DexConfirmSwapDialog />
        <DexTokenValueComparison />
        <DexSwapCollapsibleInfo />
      </CardFooter>
    </Card>
  );
}
