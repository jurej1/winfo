"use client";

import { Input } from "../ui/input";
import { useAccount, useBalance } from "wagmi";

import { DexSelectToken } from "./dex-select-token";
import { TokenDBwithPrice } from "@w-info-sst/db";
import { useFormattedBigNumber } from "@/util/formatter/useFormattedBigNumber";

import { useSwapTokenUsdPrice } from "@/util/hooks/swap/util/useSwapTokenUsdPrice";
import { Skeleton } from "../ui/skeleton";
import { cn } from "@/lib/utils";
import { DexTokenAmountSelector } from "./dex-token-amount-selector";
import { useCallback, useState } from "react";
import { DexAdditionalTokensDisplayer } from "./dex-additional-tokens-displayer";
import { DexCardBackground } from "../dex/dex-card-background";
import { DexInput } from "../dex/dex-input";
import { DexTokenBalanceDisplayer } from "../dex/dex-token-balance-displayer";

type Props = {
  title: string;
  token?: TokenDBwithPrice;
  onValChanged?: (val: string) => void;
  onSetToken: (token: TokenDBwithPrice) => void;
  value: string;
  readonly?: boolean;
  isNumberInput?: boolean;
  isLoading?: boolean;
  showAmountSelector?: boolean;
  balanceToLow?: boolean;
  additionalTokens?: TokenDBwithPrice[];
};

export function DexCardInput({
  title,
  token,
  onValChanged,
  value,
  onSetToken,
  readonly,
  isLoading = false,
  showAmountSelector = false,
  balanceToLow,
  additionalTokens,
}: Props) {
  const { chainId, address } = useAccount();

  const tokenAddress = useCallback(
    () => (token?.native ? undefined : token?.address),
    [token],
  );

  const [isHover, setIsHover] = useState(false);

  return (
    <DexCardBackground isHovering={setIsHover}>
      <div className="flex justify-between">
        <p className="text-md text-gray-400">{title}</p>
        {showAmountSelector && !isLoading && (
          <DexTokenAmountSelector
            tokenAddress={tokenAddress()}
            show={isHover}
            onSelect={(val) => {
              if (onValChanged != undefined) onValChanged(val.toString());
            }}
          />
        )}
        {additionalTokens && (
          <DexAdditionalTokensDisplayer
            tokens={additionalTokens}
            show={isHover}
            onSelect={onSetToken}
          />
        )}
      </div>

      <div className="flex items-center justify-between gap-4">
        {isLoading ? (
          <Skeleton className="h-8 w-40 rounded-full bg-gray-300" />
        ) : (
          <DexInput
            disabled={isLoading}
            className={cn({
              "text-red-400": balanceToLow,
            })}
            value={value}
            onChange={(event) => {
              if (onValChanged === undefined) return;
              let val = event.target.value;
              val = val.replace(/[^0-9.,]/g, "");
              onValChanged(val);
            }}
            readOnly={readonly}
          />
        )}
        <DexSelectToken token={token} onSetToken={onSetToken} />
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
