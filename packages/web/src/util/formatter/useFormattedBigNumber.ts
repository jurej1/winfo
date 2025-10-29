import { NumberType } from "./types";
import { formatUnits } from "viem";
import { useLocalizedFormatter } from "./useLocalizedFormatter";

interface UseFormattedNumberProps {
  value?: bigint;
  decimals?: number;
  type?: NumberType;
}

export const useFormattedBigNumber = ({
  value,
  decimals,
  type = NumberType.TokenNonTx,
}: UseFormattedNumberProps) => {
  const { formatNumberOrString } = useLocalizedFormatter();

  if (!value || !decimals) return "0.0";

  const formattedValue = formatUnits(value, decimals);

  return formatNumberOrString({
    value: formattedValue,
    type: type,
  });
};
