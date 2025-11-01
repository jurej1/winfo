"use client";

import {
  LimitOrderExpiry,
  useLimitOrder,
} from "@/util/hooks/limit-order/useLimitOrder";
import { DexCardHeader, DexSwapTokensButton } from "../dex-swap";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { DexLimitOrderInputCard } from "./dex-limit-order-input-card";
import { useDexAdditionalTokens } from "@/util/hooks/useDexAdditionalTokens";
import { DexLimitOrderSubmit } from "./dex-limit-order-submit";
import { DexWhenWorthInput } from "./dex-when-worth-input";
import { DexExpirySelector } from "./dex-expiry-selector";

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

  return (
    <Card>
      <CardHeader>
        <DexCardHeader title={"Limit Order"} isLoading={false} />
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
            numberInput={true}
            readonly={false}
            setVal={setSellAmount}
            value={sellAmount}
            showTokenPercentageSelector={true}
          />
          <DexLimitOrderInputCard
            setToken={setBuyToken}
            token={buyToken}
            title={"Buy"}
            numberInput={false}
            readonly={true}
            setVal={setBuyAmount}
            value={buyAmount}
            showTokenPercentageSelector={false}
            additionalTokens={additionalTokens}
          />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <DexExpirySelector setExpiry={setExpiry} selected={expiry} />
        <DexLimitOrderSubmit orderParams={limitOrderParams()} />
      </CardFooter>
    </Card>
  );
}
