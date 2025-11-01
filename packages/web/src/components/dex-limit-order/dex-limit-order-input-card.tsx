"use client";

import { cn } from "@/lib/utils";
import { useCallback, useState } from "react";
import { DexTokenAmountSelector } from "../dex-swap/dex-token-amount-selector";
import { useAccount, useBalance } from "wagmi";
import { TokenDBwithPrice } from "@w-info-sst/db";
import { Input } from "../ui/input";
import { useFormattedBigNumber } from "@/util/formatter/useFormattedBigNumber";
import { NumberType } from "@/util/formatter/types";
import { useSwapTokenUsdPrice } from "@/util/hooks/swap/util/useSwapTokenUsdPrice";
import { DexSelectToken } from "../dex-swap";
import { DexAdditionalTokensDisplayer } from "../dex-swap/dex-additional-tokens-displayer";
import { DexCardBackground } from "../dex/dex-card-bacground";

type Props = {
  title: string;
  token?: TokenDBwithPrice;
  setToken: (token: TokenDBwithPrice) => void;
  numberInput: boolean;
  readonly: boolean;
  value: string;
  setVal: (val: string) => void;
  showTokenPercentageSelector: boolean;
  additionalTokens?: TokenDBwithPrice[];
};

export function DexLimitOrderInputCard({
  token,
  setToken,
  title,
  numberInput,
  readonly,
  setVal,
  value,
  showTokenPercentageSelector,
  additionalTokens,
}: Props) {
  const [isHover, setIsHover] = useState(false);

  const { chainId, address } = useAccount();

  const tokenAddress = useCallback(
    () => (token?.native ? undefined : token?.address),
    [token],
  );

  const { data: balance } = useBalance({
    chainId,
    address,
    token: tokenAddress(),
    query: {
      refetchInterval: 1000 * 10,
    },
  });

  const formattedValue = useFormattedBigNumber({
    decimals: balance?.decimals,
    value: balance?.value,
    type: NumberType.TokenTx,
  });

  const usdPrice = useSwapTokenUsdPrice({
    price: token?.priceUsd,
    value,
  });

  return (
    <DexCardBackground isHovering={setIsHover}>
      <div className="flex justify-between">
        <p className="text-md text-gray-400">{title}</p>
        {showTokenPercentageSelector && (
          <DexTokenAmountSelector
            show={isHover}
            onSelect={(val) => setVal(val.toString())}
          />
        )}
        {additionalTokens && (
          <DexAdditionalTokensDisplayer
            tokens={additionalTokens}
            show={isHover}
            onSelect={setToken}
          />
        )}
      </div>
      <div className="flex items-center justify-between gap-4">
        <Input
          disabled={false}
          key={token?.address}
          type={numberInput ? "number" : undefined}
          className={cn(
            "border-none font-medium text-black shadow-none focus-visible:border-none focus-visible:ring-0",
            "transition-colors duration-300 ease-in-out",
            // TOOD amount to low missin
          )}
          placeholder="0.0"
          value={value}
          style={{
            fontSize: 28,
          }}
          onChange={(event) => {
            setVal(event.target.value);
          }}
          readOnly={readonly}
        />
        <DexSelectToken token={token} onSetToken={setToken} />
      </div>
      {token && (
        <div className="flex items-center justify-between text-gray-400">
          <span>{usdPrice}</span>
          <span
            className={cn(
              "text-base",
              "transition-colors duration-300 ease-in-out",
              //   {
              //     "text-red-400": amountToLow,
              //     "text-gray-400": !amountToLow,
              //   },
            )}
          >
            {formattedValue} {balance?.symbol}
          </span>
        </div>
      )}
    </DexCardBackground>
  );
}
