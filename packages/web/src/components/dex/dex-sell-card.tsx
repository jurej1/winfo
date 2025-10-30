"use client";

import { useSwapStore } from "@/util/hooks/swap/useSwapStore";
import { DexCardInput } from "./dex-card-input";

export function DexSellCard() {
  const { sellToken, sellAmount, setSellAmount, setSellToken } = useSwapStore();

  return (
    <DexCardInput
      title="Sell"
      token={sellToken}
      value={sellAmount}
      onValChanged={setSellAmount}
      onSetToken={setSellToken}
      isNumberInput
      showAmountSelector
    />
  );
}
