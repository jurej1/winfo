"use client";

import { cn } from "@/lib/utils";
import { useCallback } from "react";

import { GetBalanceData } from "wagmi/query";

type Props = {
  balance?: GetBalanceData;
  show: boolean;
  onSelect: (val: number) => void;
};

export function DexTokenAmountSelector({ balance, show, onSelect }: Props) {
  const percentages = useCallback(() => [0.25, 0.5, 0.75, 1], []);

  const handleOnPressed = (val: number) => {
    if (!balance) return;

    const normalAmount =
      (Number(balance.value) * val) / Math.pow(10, balance.decimals);

    onSelect(normalAmount);
  };

  return (
    <div
      className={cn("flex flex-row gap-2 transition-opacity duration-200", {
        "opacity-100": show,
        "opacity-0": !show,
      })}
    >
      {percentages().map((p) => (
        <ButtonItem percentage={p} onClick={() => handleOnPressed(p)} key={p} />
      ))}
    </div>
  );
}

const ButtonItem = ({
  percentage,
  onClick,
}: {
  percentage: number;
  onClick: () => void;
}) => {
  const displayPercentage = useCallback(() => {
    if (percentage === 1) return "MAX";
    const result = percentage * 100;

    return result + "%";
  }, [percentage]);

  return (
    <button
      onClick={onClick}
      className="hover: cursor-pointer rounded-lg border bg-white p-1 text-sm text-gray-500 hover:bg-white/55"
    >
      {displayPercentage()}
    </button>
  );
};
