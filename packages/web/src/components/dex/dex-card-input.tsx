import { Input } from "../ui/input";
import { useAccount, useBalance } from "wagmi";

import { DexSelectToken } from "./dex-select-token";
import { TokenDBwithPrice } from "@w-info-sst/db";
import { useFormattedBigNumber } from "@/util/formatter/useFormattedBigNumber";
import { NumberType } from "@/util/formatter/types";
import { useSwapStore } from "@/util/hooks/swap/useSwapStore";
import { useSwapTokenUsdPrice } from "@/util/hooks/swap/util/useSwapTokenUsdPrice";
import { Skeleton } from "../ui/skeleton";
import { cn } from "@/lib/utils";
import { DexTokenAmountSelector } from "./dex-token-amount-selector";
import { useEffect, useRef, useState } from "react";

type Props = {
  title: string;
  token?: TokenDBwithPrice;
  onValChanged: (val: string) => void;
  onSetToken: (token: TokenDBwithPrice) => void;
  value: string;
  readonly?: boolean;
  isNumberInput?: boolean;
  isLoading?: boolean;
  showAmountSelector?: boolean;
  showAmountError?: boolean;
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
  showAmountError = true,
}: Props) {
  const { chainId, address } = useAccount();

  const tokenAddress = token?.native ? undefined : token?.address;

  const { data: balance } = useBalance({
    chainId: chainId,
    address: address,
    token: tokenAddress,
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

  const isLoadingTokens = useSwapStore((store) => store.loadingTokens);

  const [isHover, setIsHover] = useState(false);
  const [isBalanceToLow, setIsBalanceToLow] = useState(false);

  useEffect(() => {
    if (!showAmountError) {
      setIsBalanceToLow(false);
    }

    if (!balance) return;

    const balanceFormatted =
      Number(balance.value) / Math.pow(10, balance.decimals);

    if (balanceFormatted < Number(value)) {
      setIsBalanceToLow(true);
    } else {
      setIsBalanceToLow(false);
    }
  }, [balance, value, showAmountError]);

  return (
    <div
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      className={cn(
        "flex flex-col gap-2 rounded-2xl bg-blue-200/20 p-4",
        "transition-colors duration-200 hover:bg-blue-200/15",
      )}
    >
      <div className="flex justify-between">
        <p className="text-md text-gray-400">{title}</p>
        {showAmountSelector && balance && (
          <DexTokenAmountSelector
            balance={balance}
            show={isHover}
            onSelect={(val) => onValChanged(val.toString())}
          />
        )}
      </div>

      <div className="flex items-center justify-between gap-4">
        {isLoading ? (
          <Skeleton className="h-8 w-40 rounded-full bg-gray-300" />
        ) : (
          <Input
            disabled={isLoadingTokens}
            key={token?.address}
            type={isNumberInput ? "number" : undefined}
            className="border-none text-black shadow-none focus-visible:border-none focus-visible:ring-0"
            placeholder="0.0"
            value={value}
            style={{
              fontSize: 28,
            }}
            onChange={(event) => {
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
          <span className={cn("")}>
            {formattedValue} {balance?.symbol}
          </span>
        </div>
      )}
    </div>
  );
}
