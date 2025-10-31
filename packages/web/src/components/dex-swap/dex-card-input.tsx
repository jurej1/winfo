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
import { useState } from "react";
import { DexAdditionalTokensDisplayer } from "./dex-additional-tokens-displayer";

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
  amountToLow?: boolean;
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
  isNumberInput = false,
  showAmountSelector = false,
  amountToLow,
  additionalTokens,
}: Props) {
  const { chainId, address } = useAccount();

  const tokenAddress = token?.native ? undefined : token?.address;

  const { data: balance } = useBalance({
    chainId,
    address,
    token: tokenAddress,
    query: {
      refetchInterval: 1000 * 10,
    },
  });

  const formattedValue = useFormattedBigNumber({
    decimals: balance?.decimals,
    value: balance?.value,
  });

  const usdPrice = useSwapTokenUsdPrice({
    price: token?.priceUsd,
    value,
  });

  const [isHover, setIsHover] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      className={cn(
        "flex flex-col gap-2 rounded-2xl bg-blue-200/20 p-4",
        "transition-colors duration-200 hover:bg-blue-200/40",
      )}
    >
      <div className="flex justify-between">
        <p className="text-md text-gray-400">{title}</p>
        {showAmountSelector && !isLoading && balance && (
          <DexTokenAmountSelector
            balance={balance}
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
          <Input
            disabled={isLoading}
            key={token?.address}
            type={isNumberInput ? "number" : undefined}
            className={cn(
              "border-none text-black shadow-none focus-visible:border-none focus-visible:ring-0",
              "transition-colors duration-300 ease-in-out",
              {
                "text-red-400": amountToLow,
              },
            )}
            placeholder="0.0"
            value={value}
            style={{
              fontSize: 28,
            }}
            onChange={(event) => {
              if (onValChanged === undefined) return;
              const val = event.target.value;
              onValChanged(val);
            }}
            readOnly={readonly}
          />
        )}
        <DexSelectToken token={token} onSetToken={onSetToken} />
      </div>
      {token && (
        <div className="flex items-center justify-between text-gray-400">
          <span>{usdPrice}</span>
          <span
            className={cn(
              "text-base",
              "transition-colors duration-300 ease-in-out",
              {
                "text-red-400": amountToLow,
                "text-gray-400": !amountToLow,
              },
            )}
          >
            {formattedValue} {balance?.symbol}
          </span>
        </div>
      )}
    </div>
  );
}
