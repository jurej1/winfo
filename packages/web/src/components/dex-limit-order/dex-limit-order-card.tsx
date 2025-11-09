"use client";

import {
  LimitOrderExpiry,
  useLimitOrder,
} from "@/util/hooks/limit-order/useLimitOrder";
import { DexCardHeader, DexSwapTokensButton } from "../dex-swap";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { DexLimitOrderInputCard } from "./dex-limit-order-input-card";
import { useDexAdditionalTokens } from "@/util/hooks/useDexAdditionalTokens";
import { DexLimitOrderSubmit } from "./dex-limit-order-submit";
import { DexWhenWorthInput } from "./dex-when-worth-input";
import { DexExpirySelector } from "./dex-expiry-selector";
import { TbClockHour4 } from "react-icons/tb";
import { cn } from "@/lib/utils";
import { useMemo } from "react";
import { formatCurrency } from "@coingecko/cryptoformat";
import { IoInformationCircleOutline } from "react-icons/io5";
import { HiArrowUp, HiArrowDown } from "react-icons/hi";

export function DexLimitOrderCard() {
  const {
    setSellToken,
    sellToken,
    setSellAmount,
    sellAmount,
    setBuyAmount,
    buyToken,
    setBuyToken,
    buyAmount,
    tokens,
    ratio,
    setRatio,
    limitOrderParams,
    setExpiry,
    expiry,
    selectRatio,
    ratioPercentage,
    swapTokens,
  } = useLimitOrder();

  const additionalTokens = useDexAdditionalTokens({
    buyToken,
    tokens,
    sellToken,
  });

  const orderSummary = useMemo(() => {
    if (!sellToken || !buyToken || !ratio) return null;

    const currentMarketRate = sellToken.priceUsd / buyToken.priceUsd;
    const targetRate = parseFloat(ratio);
    const priceDifference = ((targetRate - currentMarketRate) / currentMarketRate) * 100;
    const isAboveMarket = targetRate > currentMarketRate;

    // Calculate expiry time remaining
    const getExpiryLabel = () => {
      switch (expiry) {
        case "1h": return "1 hour";
        case "1d": return "1 day";
        case "3d": return "3 days";
        case "7d": return "7 days";
        case "30d": return "30 days";
        default: return expiry;
      }
    };

    return {
      currentMarketRate,
      targetRate,
      priceDifference,
      isAboveMarket,
      expiryLabel: getExpiryLabel(),
    };
  }, [sellToken, buyToken, ratio, expiry]);

  return (
    <Card>
      <CardHeader className="border-b border-neutral-100">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary/10 to-primary/5">
            <TbClockHour4 className="h-5 w-5 text-primary" />
          </div>
          <CardTitle className="text-base font-semibold text-neutral-900">
            Limit Order
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <DexWhenWorthInput
          buyToken={buyToken}
          sellToken={sellToken}
          ratio={ratio}
          setRatio={setRatio}
          selectRatio={selectRatio}
          ratioPercentage={ratioPercentage}
        />
        <div className="relative flex flex-col gap-2">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <DexSwapTokensButton onClick={swapTokens} />
          </div>
          <DexLimitOrderInputCard
            setToken={setSellToken}
            token={sellToken}
            title={"Sell"}
            readonly={false}
            setVal={setSellAmount}
            value={sellAmount}
            showTokenPercentageSelector={true}
          />
          <DexLimitOrderInputCard
            setToken={setBuyToken}
            token={buyToken}
            title={"Buy"}
            readonly={true}
            setVal={setBuyAmount}
            value={buyAmount}
            showTokenPercentageSelector={false}
            additionalTokens={additionalTokens}
          />
        </div>
      </CardContent>

      {/* Order Summary Section */}
      {orderSummary && sellAmount && buyAmount && (
        <div className="border-t border-neutral-100 bg-gradient-to-br from-neutral-50/50 to-transparent px-6 py-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-medium text-neutral-500">
              <IoInformationCircleOutline className="h-4 w-4" />
              <span>Order Summary</span>
            </div>
            
            <div className="space-y-2">
              {/* Order Type */}
              <div className="flex items-center justify-between text-sm">
                <span className="text-neutral-600">Order Type</span>
                <div className="flex items-center gap-1">
                  {orderSummary.isAboveMarket ? (
                    <HiArrowUp className="h-4 w-4 text-success-600" />
                  ) : (
                    <HiArrowDown className="h-4 w-4 text-error-600" />
                  )}
                  <span
                    className={cn(
                      "font-semibold",
                      orderSummary.isAboveMarket ? "text-success-600" : "text-error-600",
                    )}
                  >
                    {orderSummary.isAboveMarket ? "Sell Above" : "Buy Below"} Market
                  </span>
                </div>
              </div>

              {/* Execution Price */}
              <div className="flex items-center justify-between text-sm">
                <span className="text-neutral-600">Execution Price</span>
                <span className="font-semibold text-neutral-900">
                  1 {sellToken?.symbol} = {orderSummary.targetRate.toFixed(6)} {buyToken?.symbol}
                </span>
              </div>

              {/* Current Market Price */}
              <div className="flex items-center justify-between text-sm">
                <span className="text-neutral-600">Current Market</span>
                <span className="font-medium text-neutral-700">
                  1 {sellToken?.symbol} = {orderSummary.currentMarketRate.toFixed(6)} {buyToken?.symbol}
                </span>
              </div>

              {/* Price Difference */}
              <div className="flex items-center justify-between text-sm">
                <span className="text-neutral-600">Difference</span>
                <span
                  className={cn(
                    "font-semibold",
                    orderSummary.isAboveMarket ? "text-success-600" : "text-error-600",
                  )}
                >
                  {orderSummary.priceDifference > 0 ? "+" : ""}
                  {orderSummary.priceDifference.toFixed(2)}%
                </span>
              </div>

              {/* Expiry */}
              <div className="flex items-center justify-between rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm">
                <span className="text-neutral-600">Expires In</span>
                <span className="font-medium text-neutral-900">
                  {orderSummary.expiryLabel}
                </span>
              </div>

              {/* Order Amount */}
              <div className="mt-3 rounded-lg border border-primary/20 bg-gradient-to-br from-primary/5 to-transparent p-3">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-neutral-500">You're Selling</span>
                    <span className="font-semibold text-neutral-900">
                      {sellAmount} {sellToken?.symbol}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-neutral-500">You'll Receive</span>
                    <span className="font-semibold text-neutral-900">
                      {buyAmount} {buyToken?.symbol}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <CardFooter className="flex flex-col gap-4">
        <DexExpirySelector setExpiry={setExpiry} selected={expiry} />
        <DexLimitOrderSubmit
          orderParams={limitOrderParams()}
          sellToken={sellToken}
          buyToken={buyToken}
        />
      </CardFooter>
    </Card>
  );
}
