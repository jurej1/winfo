"use client";

import { useSwap } from "@/util/hooks/swap/useSwap";

import {
  DexSwapTokensButton,
  DexCardHeader,
  DexConfirmSwapDialog,
  DexTokenValueComparison,
  DexCardInput,
} from "@/components/dex-swap";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useSwapSellBalanceToLow } from "@/util/hooks/swap/useSwapSellBalanceToLow";
import { useDexAdditionalTokens } from "@/util/hooks/useDexAdditionalTokens";
import { useFormattedBigNumber } from "@/util/formatter/useFormattedBigNumber";
import { NumberType } from "@/util/formatter/types";

export function DexSwapCard() {
  const {
    isLoadingTokens,
    swapTokens,
    sellToken,
    sellAmount,
    setSellAmount,
    setSellToken,
    isFetchingQuote,
    tokens,
    buyToken,
    setBuyToken,
    quote,
  } = useSwap();

  const isUserBalanceToLow = useSwapSellBalanceToLow({
    amount: sellAmount,
    token: sellToken,
  });

  const filteredTokens = useDexAdditionalTokens({
    tokens,
    buyToken,
    sellToken,
  });

  const formattedBuyAmount = useFormattedBigNumber({
    decimals: buyToken?.decimals,
    value: BigInt(quote?.buyAmount ?? "0"),
    type: NumberType.TokenTx,
  });

  return (
    <Card>
      <CardHeader>
        <DexCardHeader isLoading={isLoadingTokens} title="Swap" />
      </CardHeader>
      <CardContent className="relative flex flex-col gap-2">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <DexSwapTokensButton onClick={swapTokens} />
        </div>
        <DexCardInput
          title="Sell"
          token={sellToken}
          value={sellAmount}
          onValChanged={setSellAmount}
          onSetToken={setSellToken}
          isNumberInput
          showAmountSelector
          balanceToLow={isUserBalanceToLow}
        />
        <DexCardInput
          title="Buy"
          value={formattedBuyAmount}
          token={buyToken}
          onSetToken={setBuyToken}
          readonly
          isLoading={isFetchingQuote}
          additionalTokens={filteredTokens}
        />
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-2">
        <DexConfirmSwapDialog
          balanceToLow={isUserBalanceToLow}
          sellToken={sellToken}
          loadingQuote={isFetchingQuote}
          quote={quote}
        />
        <DexTokenValueComparison sellToken={sellToken} buyToken={buyToken} />
      </CardFooter>
    </Card>
  );
}
