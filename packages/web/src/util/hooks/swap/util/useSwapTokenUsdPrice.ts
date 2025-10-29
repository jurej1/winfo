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
    if (!price || !value) return;

    const valNumber = Number(value);
    const tokenPrice = Number(price);

    if (isNaN(valNumber) || isNaN(tokenPrice)) return;

    const totalUsd = valNumber * tokenPrice;
    return `$${totalUsd.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
  }, [price, value]);
};
