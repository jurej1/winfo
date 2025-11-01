import { cn } from "@/lib/utils";
import { useLocalizedFormatter } from "@/util/formatter/useLocalizedFormatter";
import { RATIO_PERCENTAGES } from "@/util/hooks/limit-order/useLimitOrder";
import { useCallback } from "react";

type Props = {
  selectRatio: (val: number) => void;
  ratioPercentage: number;
};

export function DexLimitOrderRatioSelecetor({
  selectRatio,
  ratioPercentage,
}: Props) {
  const { formatPercent } = useLocalizedFormatter();

  const percentageFormatted = useCallback(() => {
    const result = formatPercent(ratioPercentage, 2);

    let val = result.endsWith("%") ? result.slice(0, -1) : result;
    val = val.replace(/,/g, "");

    return {
      percentage: result,
      val: Number(val),
    };
  }, [ratioPercentage]);

  const marketButtonText = useCallback(() => {
    const { val, percentage } = percentageFormatted();

    if (Math.abs(val) < 1) return "Market";

    return percentage;
  }, [percentageFormatted]);

  const RatioButton = ({
    children,
    val,
  }: {
    children: React.ReactNode;
    val: number;
  }) => {
    return (
      <button
        onClick={() => selectRatio(val)}
        className={cn(
          "scale-100 cursor-pointer rounded-2xl border bg-transparent px-2 text-sm font-semibold text-gray-500",
          "transition-transform duration-150 ease-in-out hover:scale-110",
        )}
      >
        {children}
      </button>
    );
  };

  return (
    <div className="flex gap-1">
      <RatioButton val={0}>{marketButtonText()}</RatioButton>
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
