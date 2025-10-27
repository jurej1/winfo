"use client";

import { DexCardInput } from "@/components/dex/dex-card-input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

import { useSwap } from "@/util/hooks/useSwapStore";

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
        <CardHeader>Swap Interface</CardHeader>

        <CardContent className="flex flex-col gap-2">
          <DexCardInput
            title="Sell"
            token={sellToken}
            value={sellAmount}
            onValChanged={setSellAmount}
            onSetToken={setSellToken}
          />
          <DexCardInput
            onSetToken={setBuyToken}
            title="Buy"
            value={buyAmount}
            token={buyToken}
            onValChanged={setBuyAmount}
            readonly
          />
        </CardContent>
        <CardFooter>
          <p>Ready to swap.</p>
        </CardFooter>
      </Card>
    </div>
  );
}
