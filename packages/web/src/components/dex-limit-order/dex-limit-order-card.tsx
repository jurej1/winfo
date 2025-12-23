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
import { motion } from "framer-motion";
import { fadeInUp, cardHover } from "@/lib/animations";

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
        case "1d": return "1 day";
        case "1w": return "1 week";
        case "1m": return "1 month";
        case "1y": return "1 year";
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
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      whileHover="hover"
    >
      <motion.div variants={cardHover}>
        <Card variant="glass-elevated" className="hover-glow-purple">
          <CardHeader className="border-b border-white/10">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-accent-purple-500/20 to-accent-blue-500/20">
                <TbClockHour4 className="h-5 w-5 text-accent-purple-500" />
              </div>
              <CardTitle className="text-base font-semibold">
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
            <div className="glass-subtle mx-6 rounded-lg px-4 py-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                  <IoInformationCircleOutline className="h-4 w-4" />
                  <span>Order Summary</span>
                </div>

                <div className="space-y-2">
                  {/* Order Type */}
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Order Type</span>
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
                    <span className="text-muted-foreground">Execution Price</span>
                    <span className="font-semibold">
                      1 {sellToken?.symbol} = {orderSummary.targetRate.toFixed(6)} {buyToken?.symbol}
                    </span>
                  </div>

                  {/* Current Market Price */}
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Current Market</span>
                    <span className="font-medium">
                      1 {sellToken?.symbol} = {orderSummary.currentMarketRate.toFixed(6)} {buyToken?.symbol}
                    </span>
                  </div>

                  {/* Price Difference */}
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Difference</span>
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
                  <div className="glass-subtle flex items-center justify-between rounded-lg px-3 py-2 text-sm">
                    <span className="text-muted-foreground">Expires In</span>
                    <span className="font-medium">
                      {orderSummary.expiryLabel}
                    </span>
                  </div>

                  {/* Order Amount */}
                  <div className="mt-3 rounded-lg border border-accent-purple-500/20 bg-gradient-to-br from-accent-purple-500/5 to-transparent p-3">
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">You&apos;re Selling</span>
                        <span className="font-semibold">
                          {sellAmount} {sellToken?.symbol}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">You&apos;ll Receive</span>
                        <span className="font-semibold">
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
      </motion.div>
    </motion.div>
  );
}
