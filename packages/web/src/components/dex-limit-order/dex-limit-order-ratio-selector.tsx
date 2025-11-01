import { cn } from "@/lib/utils";
import { RATIO_PERCENTAGES } from "@/util/hooks/limit-order/useLimitOrder";

type Props = {
  selectRatio: (val: number) => void;
};

export function DexLimitOrderRatioSelecetor({ selectRatio }: Props) {
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
      <RatioButton val={0}>Market</RatioButton>
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
