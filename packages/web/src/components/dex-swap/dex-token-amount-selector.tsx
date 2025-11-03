"use client";

import { DexTokenValuePercentButton } from "./dex-token-value-percent-button";
import { useCallback } from "react";
import { useAccount, useBalance } from "wagmi";
import { Address } from "viem";

type Props = {
  show: boolean;
  onSelect: (val: number) => void;
  tokenAddress: Address | undefined;
};

export function DexTokenAmountSelector({
  show,
  onSelect,
  tokenAddress,
}: Props) {
  const percentages = [0.25, 0.5, 0.75, 1];

  const { chainId, address } = useAccount();

  const { data: balance } = useBalance({
    chainId,
    address,
    token: tokenAddress,
    query: {
      refetchInterval: 1000 * 10,
    },
  });

  const handleOnPressed = useCallback(
    (val: number) => {
      if (!balance) return;

      const normalAmount =
        (Number(balance.value) * val) / Math.pow(10, balance.decimals);

      onSelect(normalAmount);
    },
    [balance],
  );

  return (
    <div className="flex flex-row gap-2">
      {percentages.map((p, index) => (
        <DexTokenValuePercentButton
          percentage={p}
          onClick={() => handleOnPressed(p)}
          key={p}
          index={index}
          show={show}
        />
      ))}
    </div>
  );
}
