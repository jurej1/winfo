"use client";

import { useSwap } from "@/util/hooks/swap/useSwap";

import {
  DexSwapTokensButton,
  DexConfirmSwapDialog,
  DexTokenValueComparison,
  DexCardInput,
} from "@/components/dex-swap";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useSwapSellBalanceToLow } from "@/util/hooks/swap/useSwapSellBalanceToLow";
import { useDexAdditionalTokens } from "@/util/hooks/useDexAdditionalTokens";
import { useFormattedBigNumber } from "@/util/formatter/useFormattedBigNumber";
import { NumberType } from "@/util/formatter/types";
import { Spinner } from "../ui/spinner";
import { DexSwapSettingsDialog } from "./dex-swap-settings-dialog";
import { TbArrowsExchange } from "react-icons/tb";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@coingecko/cryptoformat";
import { useMemo } from "react";
import { IoInformationCircleOutline } from "react-icons/io5";
import { HiArrowRight } from "react-icons/hi";

type Props = ReturnType<typeof useSwap>;

export function DexSwapCard(swap: Props) {
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
    slippage,
    setSlippage,
  } = swap;

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

  const quoteDetails = useMemo(() => {
    if (!quote || !sellToken || !buyToken || !sellAmount) return null;

    const sellAmountNum = parseFloat(sellAmount);
    const buyAmountNum = parseFloat(formattedBuyAmount);

    // Calculate price impact
    const expectedPrice = sellToken.priceUsd / buyToken.priceUsd;
    const actualPrice = sellAmountNum / buyAmountNum;
    const priceImpact = ((actualPrice - expectedPrice) / expectedPrice) * 100;

    // Calculate minimum received
    const minBuyAmountNum = parseFloat(
      (BigInt(quote.minBuyAmount) / BigInt(10 ** buyToken.decimals)).toString(),
    );

    // Calculate gas fee in USD (approximate)
    const gasFeeEth = parseFloat(quote.totalNetworkFee) / 1e18;
    const gasFeeUsd =
      gasFeeEth *
      (sellToken.address === "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"
        ? sellToken.priceUsd
        : 0);

    return {
      priceImpact,
      minBuyAmount: minBuyAmountNum,
      gasFeeUsd,
      route: quote.route,
      liquidityAvailable: quote.liquidityAvailable,
    };
  }, [quote, sellToken, buyToken, sellAmount, formattedBuyAmount]);

  return (
    <Card>
      <CardHeader className="flex items-center justify-between border-b border-neutral-100">
        <div className="flex items-center gap-2">
          <div className="from-primary/10 to-primary/5 flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br">
            <TbArrowsExchange className="text-primary h-5 w-5" />
          </div>
          <CardTitle className="text-base font-semibold text-neutral-900">
            Token Swap
          </CardTitle>
        </div>
        <div className="flex items-center gap-2">
          {isLoadingTokens ? (
            <Spinner />
          ) : (
            <DexSwapSettingsDialog
              slippage={slippage}
              onSlippageChanged={setSlippage}
            />
          )}
        </div>
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

      {/* Quote Details Section */}
      {quote && quoteDetails && !isFetchingQuote && (
        <div className="border-t border-neutral-100 bg-gradient-to-br from-neutral-50/50 to-transparent px-6 py-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-medium text-neutral-500">
              <IoInformationCircleOutline className="h-4 w-4" />
              <span>Transaction Details</span>
            </div>

            <div className="space-y-2">
              {/* Exchange Rate */}
              <div className="flex items-center justify-between text-sm">
                <span className="text-neutral-600">Rate</span>
                <DexTokenValueComparison
                  sellToken={sellToken}
                  buyToken={buyToken}
                />
              </div>

              {/* Price Impact */}
              <div className="flex items-center justify-between text-sm">
                <span className="text-neutral-600">Price Impact</span>
                <span
                  className={cn(
                    "font-semibold",
                    Math.abs(quoteDetails.priceImpact) < 1
                      ? "text-success-600"
                      : Math.abs(quoteDetails.priceImpact) < 3
                        ? "text-amber-600"
                        : "text-error-600",
                  )}
                >
                  {quoteDetails.priceImpact > 0 ? "+" : ""}
                  {quoteDetails.priceImpact.toFixed(2)}%
                </span>
              </div>

              {/* Minimum Received */}
              <div className="flex items-center justify-between text-sm">
                <span className="text-neutral-600">Minimum Received</span>
                <span className="font-medium text-neutral-900">
                  {quoteDetails.minBuyAmount.toFixed(6)} {buyToken?.symbol}
                </span>
              </div>

              {/* Network Fee */}
              {quoteDetails.gasFeeUsd > 0 && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-neutral-600">Network Fee</span>
                  <span className="font-medium text-neutral-900">
                    ~{formatCurrency(quoteDetails.gasFeeUsd, "$")}
                  </span>
                </div>
              )}

              {/* Route */}
              {quoteDetails.route.tokens.length > 2 && (
                <div className="flex items-start justify-between text-sm">
                  <span className="text-neutral-600">Route</span>
                  <div className="flex items-center gap-1 text-xs font-medium text-neutral-700">
                    {quoteDetails.route.tokens.map((token, idx) => (
                      <div key={idx} className="flex items-center gap-1">
                        <span className="rounded bg-neutral-100 px-1.5 py-0.5">
                          {token.symbol}
                        </span>
                        {idx < quoteDetails.route.tokens.length - 1 && (
                          <HiArrowRight className="h-3 w-3 text-neutral-400" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <CardFooter className="flex flex-col items-start gap-2">
        <DexConfirmSwapDialog
          balanceToLow={isUserBalanceToLow}
          sellToken={sellToken}
          loadingQuote={isFetchingQuote}
          quote={quote}
        />
      </CardFooter>
    </Card>
  );
}
