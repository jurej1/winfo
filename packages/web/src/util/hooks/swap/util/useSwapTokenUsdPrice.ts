import { useMemo } from "react";

type UseSwapTokenUsdPriceProps = {
  price?: number;
  value?: string;
};

export const useSwapTokenUsdPrice = ({
  price,
  value,
}: UseSwapTokenUsdPriceProps) => {
  return useMemo(() => {
    if (!price || !value) return "$0.0";

    const valueSubtring =
      typeof value === "string" && (value.endsWith(".") || value.endsWith(","))
        ? value.slice(0, -1)
        : value;

    const valNumber = Number(valueSubtring);
    const tokenPrice = Number(price);

    if (isNaN(valNumber) || isNaN(tokenPrice)) return "$0.0";

    const totalUsd = valNumber * tokenPrice;
    return `$${totalUsd.toLocaleString(undefined, { maximumFractionDigits: 4, minimumFractionDigits: 1 })}`;
  }, [price, value]);
};
