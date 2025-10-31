"use client";

import { useLimitOrder } from "@/util/hooks/limit-order/useLimitOrder";
import { DexCardHeader, DexSwapTokensButton } from "../dex-swap";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { DexLimitOrderInputCard } from "./dex-limit-order-input-card";
import { useDexAdditionalTokens } from "@/util/hooks/useDexAdditionalTokens";
import { DexLimitOrderSubmit } from "./dex-limit-order-submit";
import { DexWhenWorthInput } from "./dex-when-worth-input";

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
    isTokensLoading,
    ratio,
    setRatio,
    limitOrderParams,
  } = useLimitOrder();

  const additionalTokens = useDexAdditionalTokens({
    buyToken,
    tokens,
    sellToken,
  });

  // 4. Input field -> expiration &&&

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
        />

        <div className="relative flex flex-col gap-2">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <DexSwapTokensButton
              onClick={() => {
                console.log("TODO");
              }}
            />
          </div>

          <DexLimitOrderInputCard
            setToken={setSellToken}
            token={sellToken}
            title={"Sell"}
            numberInput={true}
            readonly={false}
            setVal={setSellAmount}
            value={sellAmount}
            tokens={tokens}
            tokensLoading={isTokensLoading}
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
            tokens={tokens}
            tokensLoading={isTokensLoading}
            showTokenPercentageSelector={false}
            additionalTokens={additionalTokens}
          />
        </div>
      </CardContent>
      <CardFooter>
        <DexLimitOrderSubmit orderParams={limitOrderParams()} />
      </CardFooter>
    </Card>
  );
}
