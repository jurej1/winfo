"use client";

import { Button } from "../ui/button";
import { formatCurrency } from "@coingecko/cryptoformat";
import { TokenDBwithPrice } from "@w-info-sst/db";
import { useCallback, useState } from "react";

type Props = {
  sellToken: TokenDBwithPrice | undefined;
  buyToken: TokenDBwithPrice | undefined;
};

export function DexTokenValueComparison({ sellToken, buyToken }: Props) {
  const [showSell, setShowSell] = useState(true);

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
      className="cursor-pointer px-0"
      onClick={() => setShowSell((prev) => !prev)}
    >
      1 {tokenSymbolLeading()} = {sellTokenAmount()} {tokenSymbolTrailing()}
      <span className="text-xs text-gray-400">
        ({formattedCurrencyAmount()}$)
      </span>
    </Button>
  );
}
