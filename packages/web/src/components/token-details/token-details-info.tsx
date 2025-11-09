import { formatCurrency } from "@coingecko/cryptoformat";
import { TokenListInfo } from "@w-info-sst/types";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { IoIosArrowRoundDown, IoIosArrowRoundUp } from "react-icons/io";

type Props = {
  token: TokenListInfo;
};

export function TokenDetailsInfo({ token }: Props) {
  const {
    image,
    name,
    symbol,
    current_price,
    market_cap,
    market_cap_rank,
    fully_diluted_valuation,
    high_24h,
    low_24h,
    price_change_24h,
    price_change_percentage_24h,
    price_change_percentage_1h_in_currency,
    market_cap_change_24h,
    market_cap_change_percentage_24h,
    total_volume,
    circulating_supply,
    total_supply,
    max_supply,
    ath,
    ath_change_percentage,
    ath_date,
    atl,
    atl_change_percentage,
    atl_date,
    roi,
    last_updated,
  } = token;

  const formatLargeNumber = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      notation: "compact",
      maximumFractionDigits: 2,
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatRelativeTime = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - new Date(date).getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

  return (
    <div className="flex w-full flex-col gap-6">
      {/* Token Header */}
      <div className="flex items-start gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100 p-3">
          <Image
            src={image}
            alt={name}
            height={48}
            width={48}
            className="h-full w-full rounded-full object-contain"
          />
        </div>
        <div className="flex flex-1 flex-col gap-2">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-neutral-900">{name}</h1>
            <span className="text-lg font-medium uppercase text-neutral-500">
              {symbol}
            </span>
            <span className="rounded-full bg-neutral-100 px-3 py-1 text-sm font-medium text-neutral-600">
              Rank #{market_cap_rank}
            </span>
          </div>
          <div className="flex items-baseline gap-3">
            <p className="text-4xl font-bold text-neutral-900">
              {formatCurrency(current_price, "$", "en-US")}
            </p>
            <PercentageBadge value={price_change_percentage_24h} label="24h" />
          </div>
          <div className="flex items-center gap-2">
            <PercentageBadge
              value={price_change_percentage_1h_in_currency}
              label="1h"
              size="sm"
            />
            <span className="text-xs text-neutral-400">
              Updated {formatRelativeTime(last_updated)}
            </span>
          </div>
        </div>
      </div>

      {/* Market Statistics */}
      <div className="grid grid-cols-2 gap-4">
        <MetricCard
          label="Market Cap"
          value={`$${formatLargeNumber(market_cap)}`}
          rank={market_cap_rank}
          change={market_cap_change_percentage_24h}
        />
        <MetricCard
          label="24h Volume"
          value={`$${formatLargeNumber(total_volume)}`}
        />
        <MetricCard label="24h High" value={formatCurrency(high_24h, "$")} />
        <MetricCard label="24h Low" value={formatCurrency(low_24h, "$")} />
      </div>

      {/* Fully Diluted Valuation */}
      {fully_diluted_valuation && fully_diluted_valuation > 0 && (
        <div className="rounded-lg border border-neutral-200 bg-gradient-to-br from-primary/5 to-transparent p-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-medium text-neutral-500">
                Fully Diluted Valuation
              </span>
              <p className="mt-1 text-xl font-bold text-neutral-900">
                ${formatLargeNumber(fully_diluted_valuation)}
              </p>
            </div>
            <div className="text-right">
              <span className="text-xs text-neutral-500">FDV/Market Cap</span>
              <p className="mt-1 text-sm font-semibold text-neutral-700">
                {(fully_diluted_valuation / market_cap).toFixed(2)}x
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Price Change */}
      <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-neutral-600">
            24h Price Change
          </span>
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold text-neutral-900">
              {formatCurrency(price_change_24h, "$")}
            </span>
            <PercentageBadge value={price_change_percentage_24h} />
          </div>
        </div>
      </div>

      {/* Supply Information */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-neutral-500">
          Supply Information
        </h3>
        <div className="space-y-2">
          <SupplyRow
            label="Circulating Supply"
            value={`${formatLargeNumber(circulating_supply)} ${symbol.toUpperCase()}`}
          />
          <SupplyRow
            label="Total Supply"
            value={`${formatLargeNumber(total_supply)} ${symbol.toUpperCase()}`}
          />
          {max_supply && (
            <SupplyRow
              label="Max Supply"
              value={`${formatLargeNumber(max_supply)} ${symbol.toUpperCase()}`}
            />
          )}
        </div>
      </div>

      {/* All-Time Stats */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-neutral-500">
          Historical Performance
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-lg border border-neutral-200 bg-gradient-to-br from-success-50/30 to-transparent p-4">
            <span className="text-xs font-medium text-neutral-500">
              All-Time High
            </span>
            <p className="mt-1 text-lg font-semibold text-neutral-900">
              {formatCurrency(ath, "$")}
            </p>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-xs text-neutral-500">
                {formatDate(ath_date)}
              </span>
              <span
                className={cn(
                  "text-xs font-medium",
                  ath_change_percentage < 0
                    ? "text-error-600"
                    : "text-success-600",
                )}
              >
                {ath_change_percentage.toFixed(1)}%
              </span>
            </div>
          </div>
          <div className="rounded-lg border border-neutral-200 bg-gradient-to-br from-error-50/30 to-transparent p-4">
            <span className="text-xs font-medium text-neutral-500">
              All-Time Low
            </span>
            <p className="mt-1 text-lg font-semibold text-neutral-900">
              {formatCurrency(atl, "$")}
            </p>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-xs text-neutral-500">
                {formatDate(atl_date)}
              </span>
              <span
                className={cn(
                  "text-xs font-medium",
                  atl_change_percentage > 0
                    ? "text-success-600"
                    : "text-error-600",
                )}
              >
                +{atl_change_percentage.toFixed(1)}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ROI Information */}
      {roi && (
        <div className="rounded-lg border border-neutral-200 bg-gradient-to-br from-primary/5 to-transparent p-4">
          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
              Return on Investment
            </span>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-xs text-neutral-500">Times</p>
                <p className="mt-1 text-lg font-bold text-neutral-900">
                  {roi.times.toFixed(2)}x
                </p>
              </div>
              <div>
                <p className="text-xs text-neutral-500">Percentage</p>
                <p className="mt-1 text-lg font-bold text-success-700">
                  +{roi.percentage.toFixed(1)}%
                </p>
              </div>
              <div>
                <p className="text-xs text-neutral-500">Currency</p>
                <p className="mt-1 text-sm font-semibold uppercase text-neutral-700">
                  {roi.currency}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const MetricCard = ({
  label,
  value,
  rank,
  change,
}: {
  label: string;
  value: string;
  rank?: number;
  change?: number;
}) => (
  <div className="rounded-lg border border-neutral-200 bg-white p-4">
    <span className="text-xs font-medium text-neutral-500">{label}</span>
    <div className="mt-1 flex items-baseline gap-2">
      <p className="text-lg font-semibold text-neutral-900">{value}</p>
      {rank && <span className="text-xs text-neutral-400">#{rank}</span>}
    </div>
    {change !== undefined && (
      <div className="mt-1">
        <span
          className={cn(
            "text-xs font-medium",
            change > 0 ? "text-success-600" : change < 0 ? "text-error-600" : "text-neutral-500",
          )}
        >
          {change > 0 ? "+" : ""}
          {change.toFixed(2)}% (24h)
        </span>
      </div>
    )}
  </div>
);

const SupplyRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex items-center justify-between rounded-lg border border-neutral-200 bg-white px-4 py-3">
    <span className="text-sm text-neutral-600">{label}</span>
    <span className="font-medium text-neutral-900">{value}</span>
  </div>
);

const PercentageBadge = ({
  value,
  label,
  size = "md",
}: {
  value: number;
  label?: string;
  size?: "sm" | "md";
}) => {
  const isPositive = value > 0;
  const isNegative = value < 0;
  const isNeutral = !isPositive && !isNegative;

  const formattedValue = `${isPositive ? "+" : isNegative ? "-" : ""}${Math.abs(
    value,
  ).toFixed(2)}%`;

  const sizeClasses = size === "sm" ? "px-1.5 py-0.5 text-xs" : "px-2 py-1 text-sm";
  const iconSize = size === "sm" ? "h-3 w-3" : "h-4 w-4";

  if (isNeutral) {
    return (
      <span
        className={cn(
          "inline-flex items-center gap-1 rounded-md bg-neutral-100 font-medium text-neutral-600",
          sizeClasses,
        )}
      >
        {label && <span className="text-[10px] opacity-70">{label}</span>}
        {formattedValue}
      </span>
    );
  }

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-md font-semibold",
        isPositive
          ? "bg-success-50 text-success-700"
          : "bg-error-50 text-error-700",
        sizeClasses,
      )}
    >
      {label && <span className="text-[10px] opacity-70">{label}</span>}
      {isPositive ? (
        <IoIosArrowRoundUp className={iconSize} aria-hidden="true" />
      ) : (
        <IoIosArrowRoundDown className={iconSize} aria-hidden="true" />
      )}
      {formattedValue}
    </span>
  );
};
