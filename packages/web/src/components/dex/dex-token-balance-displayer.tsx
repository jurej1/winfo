"use client";

import { cn } from "@/lib/utils";
import { NumberType } from "@/util/formatter/types";
import { useFormattedBigNumber } from "@/util/formatter/useFormattedBigNumber";
import { useSwapTokenUsdPrice } from "@/util/hooks/swap/util/useSwapTokenUsdPrice";
import { Address } from "viem";
import { useAccount, useBalance } from "wagmi";

type Props = {
  tokenAddress: Address | undefined;
  tokenPriceUsd: number;
  value: string;
};

export function DexTokenBalanceDisplayer({
  tokenAddress,
  tokenPriceUsd,
  value,
}: Props) {
  const { chainId, address } = useAccount();

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
    type: NumberType.TokenTx,
  });

  const usdPrice = useSwapTokenUsdPrice({
    price: tokenPriceUsd,
    value,
  });

  return (
    <div className="flex items-center justify-between text-gray-400">
      <span>{usdPrice}</span>
      <span
        className={cn(
          "text-base",
          "transition-colors duration-300 ease-in-out",
        )}
      >
        {formattedValue} {balance?.symbol}
      </span>
    </div>
  );
}
