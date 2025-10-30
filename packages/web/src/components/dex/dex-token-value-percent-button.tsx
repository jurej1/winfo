import { cn } from "@/lib/utils";
import { useCallback } from "react";

const BASE_DELAY_MS = 50;
const STEP_DELAY_MS = 50;

type ButtonItemProps = {
  percentage: number;
  onClick: () => void;
  index: number;
  show: boolean;
};

export const DexTokenValuePercentButton = ({
  percentage,
  onClick,
  index,
  show,
}: ButtonItemProps) => {
  const displayPercentage = useCallback(() => {
    if (percentage === 1) return "MAX";
    const result = percentage * 100;

    return result + "%";
  }, [percentage]);

  const delayMs = BASE_DELAY_MS + index * STEP_DELAY_MS;

  return (
    <button
      onClick={onClick}
      className={cn(
        "cursor-pointer rounded-lg bg-white p-1 text-sm text-gray-500 hover:bg-blue-400/10",
        "transition-opacity duration-300 ease-out",
        "transition duration-150",
        {
          "translate-y-2 opacity-0": !show,
          "translate-0 opacity-100": show,
        },
      )}
      style={{
        transitionDelay: `${delayMs}ms`,
      }}
    >
      {displayPercentage()}
    </button>
  );
};
