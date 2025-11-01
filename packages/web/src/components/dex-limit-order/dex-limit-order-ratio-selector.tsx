"use state";

import { cn } from "@/lib/utils";
import { useLocalizedFormatter } from "@/util/formatter/useLocalizedFormatter";
import { RATIO_PERCENTAGES } from "@/util/hooks/limit-order/useLimitOrder";
import { useMemo, useState } from "react";

import { IoIosClose } from "react-icons/io";

type Props = {
  selectRatio: (val: number) => void;
  ratioPercentage: number;
};

export function DexLimitOrderRatioSelecetor({
  selectRatio,
  ratioPercentage,
}: Props) {
  const { formatPercent } = useLocalizedFormatter();

  const [lastClicked, setLastClicked] = useState<number>(0);

  const percentageFormatted = useMemo(() => {
    const result = formatPercent(ratioPercentage, 2);

    let val = result.endsWith("%") ? result.slice(0, -1) : result;
    val = val.replace(/,/g, "");

    return {
      percentage: result,
      val: Number(val),
    };
  }, [ratioPercentage]);

  const marketButtonText = useMemo(() => {
    const { val, percentage } = percentageFormatted;

    if (isNaN(val) || Math.abs(val) <= 10) return "Market";

    setLastClicked(0);

    return percentage;
  }, [percentageFormatted, setLastClicked]);

  const RatioButton = ({
    children,
    val,
    showClose = false,
  }: {
    children: React.ReactNode;
    val: number;
    showClose?: boolean;
  }) => {
    const isLastClicked = val === lastClicked;

    return (
      <button
        onClick={() => {
          selectRatio(val);
          setLastClicked(val);
        }}
        className={cn(
          "flex flex-row items-center",
          "scale-100 cursor-pointer rounded-2xl border bg-transparent px-2 text-sm font-semibold text-gray-500/60",
          "transition-transform duration-150 ease-in-out hover:scale-107",
          "transition-colors duration-150 ease-in-out",
          {
            "bg-gray-200/50 text-gray-500": isLastClicked,
          },
        )}
      >
        {children}
        {showClose && <IoIosClose style={{ width: 22, height: 22 }} />}
      </button>
    );
    1;
  };

  return (
    <div className="flex gap-1">
      <RatioButton val={0} showClose={marketButtonText !== "Market"}>
        {marketButtonText}
      </RatioButton>
      {RATIO_PERCENTAGES.map((val) => {
        const percentage = val * 100;

        const prefix = "+";

        return (
          <RatioButton val={val} key={val}>
            {prefix}
            {percentage}%
          </RatioButton>
        );
      })}
    </div>
  );
}
