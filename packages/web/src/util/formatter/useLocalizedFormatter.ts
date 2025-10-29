import { useCallback, useMemo } from "react";
import { NumberType } from "./types";
import { formatNumberOrString, formatPercent } from "./numberFormatter";
// eslint-disable-next-line @typescript-eslint/no-restricted-imports

export type FormatNumberOrStringInput = {
  value: number | string;
  type?: NumberType;
  currencyCode?: string;
  placeholder?: string;
};

export interface LocalizedFormatter {
  formatNumberOrString: (input: FormatNumberOrStringInput) => string;
  formatPercent: (value: number | string, maxDecimals?: 2 | 3 | 4) => string;
}

/**
 * Hook used to return a formatter with all necessary formatting functions needed in the app.
 * This is based off of the currently selected language in the app, so it will make sure that
 * the formatted values are localized. If any new formatting needs arise, add them here.
 * @returns set of formatting functions based off of current locale
 */
export function useLocalizedFormatter(): LocalizedFormatter {
  const locale = navigator.language;

  const formatNumberOrStringInner = useCallback(
    ({
      value,
      type = NumberType.TokenNonTx,
      currencyCode,
      placeholder,
    }: FormatNumberOrStringInput): string =>
      formatNumberOrString({
        price: value,
        locale,
        currencyCode,
        type,
        placeholder,
      }),
    [locale],
  );

  const formatPercentInner = useCallback(
    (value: number | string, maxDecimals?: 2 | 3 | 4): string =>
      formatPercent({ rawPercentage: value, locale, maxDecimals }),
    [locale],
  );

  return useMemo(
    () => ({
      formatNumberOrString: formatNumberOrStringInner,
      formatPercent: formatPercentInner,
    }),
    [formatNumberOrStringInner, formatPercentInner],
  );
}
