"use client";

import { cn } from "@/lib/utils";
import { useCallback, useState } from "react";
import { DexTokenAmountSelector } from "../dex-swap/dex-token-amount-selector";
import { useAccount, useBalance } from "wagmi";
import { TokenDBwithPrice } from "@w-info-sst/db";
import { useFormattedBigNumber } from "@/util/formatter/useFormattedBigNumber";
import { NumberType } from "@/util/formatter/types";
import { useSwapTokenUsdPrice } from "@/util/hooks/swap/util/useSwapTokenUsdPrice";
import { DexSelectToken } from "../dex-swap";
import { DexAdditionalTokensDisplayer } from "../dex-swap/dex-additional-tokens-displayer";
import { DexCardBackground } from "../dex/dex-card-background";
import { DexInput } from "../dex/dex-input";
import { DexTokenBalanceDisplayer } from "../dex/dex-token-balance-displayer";

type Props = {
  title: string;
  token?: TokenDBwithPrice;
  setToken: (token: TokenDBwithPrice) => void;
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
  readonly,
  setVal,
  value,
  showTokenPercentageSelector,
  additionalTokens,
}: Props) {
  const [isHover, setIsHover] = useState(false);

  const tokenAddress = useCallback(
    () => (token?.native ? undefined : token?.address),
    [token],
  );

  return (
    <DexCardBackground isHovering={setIsHover}>
      <div className="flex justify-between">
        <p className="text-md text-gray-400">{title}</p>
        {showTokenPercentageSelector && (
          <DexTokenAmountSelector
            show={isHover}
            onSelect={(val) => setVal(val.toString())}
            tokenAddress={tokenAddress()}
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
        <DexInput
          type="number"
          value={value}
          onChange={(event) => {
            let val = event.target.value;
            val = val.replace(/[^0-9.,]/g, "");

            setVal(val);
          }}
          readOnly={readonly}
        />
        <DexSelectToken token={token} onSetToken={setToken} />
      </div>
      {token && (
        <DexTokenBalanceDisplayer
          tokenAddress={tokenAddress()}
          tokenPriceUsd={token.priceUsd}
          value={value}
        />
      )}
    </DexCardBackground>
  );
}
