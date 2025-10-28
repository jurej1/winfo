"use client";

import { DexCardInput } from "@/components/dex/dex-card-input";
import { DexConfirmSwapDialog } from "@/components/dex/dex-confirm-swap-dialog";
import { DexSwapCollapsibleInfo } from "@/components/dex/dex-swap-collapsible-info";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useSwap } from "@/util/hooks/swap/useSwap";

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
  } = useSwap();

  return (
    <div className="mx-auto my-3 max-w-7xl">
      <Card className="mx-auto max-w-xl">
        <CardHeader className="text-xl font-bold">Swap</CardHeader>

        <CardContent className="flex flex-col gap-2">
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
