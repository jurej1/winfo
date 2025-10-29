"use client";

import { useSwapStore } from "@/util/hooks/swap/useSwapStore";
import { DexCardInput } from "./dex-card-input";
import { useFormattedBigNumber } from "@/util/formatter/useFormattedBigNumber";
import { NumberType } from "@/util/formatter/types";

export function DexBuyCard() {
  const { buyAmount, buyToken, setBuyAmount, setBuyToken } = useSwapStore();

  const isLoading = useSwapStore(
    (store) => store.loadingPrice || store.loadingQuote,
  );

  const formattedBuyAmount = useFormattedBigNumber({
    decimals: buyToken?.decimals,
    value: BigInt(buyAmount),
    type: NumberType.TokenTx,
  });

  return (
    <DexCardInput
      title="Buy"
      value={formattedBuyAmount}
      token={buyToken}
      onSetToken={setBuyToken}
      onValChanged={setBuyAmount}
      readonly
      isLoading={isLoading}
    />
  );
}
