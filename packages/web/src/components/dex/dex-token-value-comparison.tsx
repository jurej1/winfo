"use client";

import { useSwapStore } from "@/util/hooks/swap/useSwapStore";
import { Button } from "../ui/button";
import { formatCurrency } from "@coingecko/cryptoformat";
import { useCallback, useMemo, useState } from "react";
import { useCall } from "wagmi";

export function DexTokenValueComparison() {
  const [showSell, setShowSell] = useState(true);

  const sellToken = useSwapStore((store) => store.sellToken);
  const buyToken = useSwapStore((store) => store.buyToken);

  const formattedCurrencyAmount = useCallback(() => {
    if (!sellToken || !buyToken) return;

    if (showSell) return sellToken.priceUsd;

    return buyToken.priceUsd;
  }, [sellToken, buyToken, showSell]);

  const sellTokenAmount = useCallback(() => {
    if (!buyToken || !sellToken) return;

    let amount;

    if (showSell) {
      amount = sellToken.priceUsd / buyToken.priceUsd;
    } else {
      amount = buyToken.priceUsd / sellToken.priceUsd;
    }

    return formatCurrency(amount, "");
  }, [sellToken, buyToken, showSell]);

  const tokenSymbolTrailing = useCallback(() => {
    if (showSell) return buyToken?.symbol;
    return sellToken?.symbol;
  }, [showSell, buyToken, sellToken]);

  const tokenSymbolLeading = useCallback(() => {
    if (!showSell) return buyToken?.symbol;
    return sellToken?.symbol;
  }, [showSell, buyToken, sellToken]);

  if (!sellToken || !buyToken) return <></>;

  return (
    <Button
      variant="link"
      className="px-0"
      onClick={() => setShowSell((prev) => !prev)}
    >
      1 {tokenSymbolLeading()} = {sellTokenAmount()} {tokenSymbolTrailing()}
      <span className="text-xs text-gray-400">
        ({formattedCurrencyAmount()}$)
      </span>
    </Button>
  );
}
