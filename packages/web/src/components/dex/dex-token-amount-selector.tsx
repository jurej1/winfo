"use client";

import { GetBalanceData } from "wagmi/query";
import { DexTokenValuePercentButton } from "./dex-token-value-percent-button";
import { useCallback } from "react";

type Props = {
  balance?: GetBalanceData;
  show: boolean;
  onSelect: (val: number) => void;
};

export function DexTokenAmountSelector({ balance, show, onSelect }: Props) {
  const percentages = [0.25, 0.5, 0.75, 1];

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
