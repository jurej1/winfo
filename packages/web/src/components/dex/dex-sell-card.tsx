"use client";

import { useSwapStore } from "@/util/hooks/swap/useSwapStore";
import { DexCardInput } from "./dex-card-input";
import { useAccount } from "wagmi";
import { useEffect } from "react";
import { useSwapSellBalanceToLow } from "@/util/hooks/swap/useSwapSellBalanceToLow";

export function DexSellCard() {
  const { sellToken, sellAmount, setSellAmount, setSellToken } = useSwapStore();

  const amountToLow = useSwapSellBalanceToLow();

  return (
    <DexCardInput
      title="Sell"
      token={sellToken}
      value={sellAmount}
      onValChanged={setSellAmount}
      onSetToken={setSellToken}
      isNumberInput
      showAmountSelector
      amountToLow={amountToLow}
    />
  );
}
