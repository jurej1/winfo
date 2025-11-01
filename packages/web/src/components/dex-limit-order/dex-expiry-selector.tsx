"use client";
import { cn } from "@/lib/utils";
import { LimitOrderExpiry } from "@/util/hooks/limit-order/useLimitOrder";
import { selectErrorBarsSettings } from "recharts/types/state/selectors/axisSelectors";

type Props = {
  setExpiry: (val: LimitOrderExpiry) => void;
  selected: LimitOrderExpiry;
};

export function DexExpirySelector({ setExpiry, selected }: Props) {
  const TimerButton = ({
    children,
    val,
  }: {
    children: React.ReactNode;
    val: LimitOrderExpiry;
  }) => {
    const isSelected = val === selected;
    return (
      <button
        className={cn(
          "cursor-pointer rounded-2xl border px-2 text-sm font-semibold",
          "hover:border-gray-200 hover:text-black/30",
          "transition duration-200 ease-in-out",
          {
            "bg-gray-100/80 text-black": isSelected,
            "bg-white text-black/50": !isSelected,
          },
        )}
        onClick={() => setExpiry(val)}
      >
        {children}
      </button>
    );
  };

  return (
    <div className="flex w-full justify-between">
      <span className="text-gray-400">Expiry</span>
      <div className="flex gap-1">
        <TimerButton val="1d">1 Day</TimerButton>
        <TimerButton val="1w">1 Week</TimerButton>
        <TimerButton val="1m">1 Month</TimerButton>
        <TimerButton val="1y">1 Year</TimerButton>
      </div>
    </div>
  );
}
