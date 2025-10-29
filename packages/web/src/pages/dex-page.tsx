"use client";

import { DexCardInput } from "@/components/dex/dex-card-input";
import { DexConfirmSwapDialog } from "@/components/dex/dex-confirm-swap-dialog";
import { DexSwapCollapsibleInfo } from "@/components/dex/dex-swap-collapsible-info";

import { IoSwapVerticalSharp } from "react-icons/io5";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";

import { useSwap } from "@/util/hooks/swap/useSwap";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { DexSwapTokensButton } from "@/components/dex/dex-swap-tokens-button";

export function DexPage() {
  const {
    sellToken,
    buyToken,
    sellAmount,
    buyAmount,
    setBuyAmount,
    setSellAmount,
    setBuyToken,
    setSellToken,
    resetStore,
    loadingTokens,
  } = useSwap();

  // CLEANUP on DISPOSE
  useEffect(() => {
    return () => resetStore();
  }, [resetStore]);

  return (
    <div className="mx-auto my-3 flex max-w-7xl">
      <Card className="mx-auto max-w-xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold">Swap</span>

            {loadingTokens && <Spinner />}
          </div>
        </CardHeader>

        <CardContent className="relative flex flex-col gap-2">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <DexSwapTokensButton />
          </div>
          <DexCardInput
            title="Sell"
            token={sellToken}
            value={sellAmount}
            onValChanged={setSellAmount}
            onSetToken={setSellToken}
          />
          <DexCardInput
            title="Buy"
            value={buyAmount}
            token={buyToken}
            onSetToken={setBuyToken}
            onValChanged={setBuyAmount}
            readonly
          />
        </CardContent>
        <CardFooter className="flex flex-col">
          <DexConfirmSwapDialog />
          <DexSwapCollapsibleInfo />
        </CardFooter>
      </Card>
    </div>
  );
}
