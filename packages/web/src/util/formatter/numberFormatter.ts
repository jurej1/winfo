import { FormatterRule, TYPE_TO_FORMATTER_RULES } from "./localeBasedFormat";
import { NumberType } from "./types";

const PLACEHOLDER_TEXT = "-";

function getFormatterRule(input: number, type: NumberType): FormatterRule {
  const { rules, defaultFormat } = TYPE_TO_FORMATTER_RULES[type];
  for (const rule of rules) {
    if (
      (rule.exact !== undefined && input === rule.exact) ||
      (rule.upperBound !== undefined && input < rule.upperBound)
    ) {
      return rule;
    }
  }

  // Use default formatting if no applicable rules found (should never happen)
  return { formatter: defaultFormat };
}

export function formatNumber({
  input,
  locale,
  currencyCode = "USD",
  type = NumberType.TokenNonTx,
  placeholder = PLACEHOLDER_TEXT,
}: {
  input: number | null | undefined;
  locale: string;
  currencyCode?: string;
  type?: NumberType;
  placeholder?: string;
}): string {
  if (input === null || input === undefined) {
    return placeholder;
  }

  const { formatter, overrideValue, postFormatModifier } = getFormatterRule(
    input,
    type,
  );
  if (typeof formatter === "string") {
    return formatter;
  }

  const createdFormat = formatter.createFormat(locale, currencyCode);
  const formatted = createdFormat.format(
    overrideValue !== undefined ? overrideValue : input,
  );
  return postFormatModifier ? postFormatModifier(formatted) : formatted;
}

export function formatNumberOrString({
  price,
  locale,
  currencyCode,
  type,
  placeholder = PLACEHOLDER_TEXT,
}: {
  price: number | string | null | undefined;
  locale: string;
  currencyCode?: string;
  type: NumberType;
  placeholder?: string;
}): string {
  if (price === null || price === undefined) {
    return placeholder;
  }
  if (typeof price === "string") {
    return formatNumber({
      input: parseFloat(price),
      locale,
      currencyCode,
      type,
      placeholder,
    });
  }
  return formatNumber({
    input: price,
    locale,
    currencyCode,
    type,
    placeholder,
  });
}

export function formatPercent({
  rawPercentage,
  locale,
  maxDecimals = 2,
}: {
  rawPercentage: number | string | null | undefined;
  locale: string;
  maxDecimals?: 2 | 3 | 4;
}): string {
  if (rawPercentage === null || rawPercentage === undefined) {
    return PLACEHOLDER_TEXT;
  }

  const type =
    maxDecimals === 3
      ? NumberType.PercentageThreeDecimals
      : maxDecimals === 4
        ? NumberType.PercentageFourDecimals
        : NumberType.Percentage;
  const percentage =
    typeof rawPercentage === "string"
      ? parseFloat(rawPercentage)
      : parseFloat(rawPercentage.toString());

  // Handle NaN cases - return fallback if percentage is invalid
  if (isNaN(percentage)) {
    return PLACEHOLDER_TEXT;
  }

  return formatNumber({ input: percentage / 100, type, locale });
}
