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
    high_24h,
    low_24h,
    price_change_24h,
    price_change_percentage_24h,
    total_volume,
    circulating_supply,
    total_supply,
    max_supply,
    ath,
    atl,
  } = token;

  const formatLargeNumber = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      notation: "compact",
      maximumFractionDigits: 2,
      minimumFractionDigits: 0,
    }).format(amount);
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
            <PercentageBadge value={price_change_percentage_24h} />
          </div>
        </div>
      </div>

      {/* Market Statistics */}
      <div className="grid grid-cols-2 gap-4">
        <MetricCard
          label="Market Cap"
          value={`$${formatLargeNumber(market_cap)}`}
          rank={market_cap_rank}
        />
        <MetricCard
          label="24h Volume"
          value={`$${formatLargeNumber(total_volume)}`}
        />
        <MetricCard label="24h High" value={formatCurrency(high_24h, "$")} />
        <MetricCard label="24h Low" value={formatCurrency(low_24h, "$")} />
      </div>

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
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-lg border border-neutral-200 p-4">
          <span className="text-xs font-medium text-neutral-500">
            All-Time High
          </span>
          <p className="mt-1 text-lg font-semibold text-neutral-900">
            {formatCurrency(ath, "$")}
          </p>
        </div>
        <div className="rounded-lg border border-neutral-200 p-4">
          <span className="text-xs font-medium text-neutral-500">
            All-Time Low
          </span>
          <p className="mt-1 text-lg font-semibold text-neutral-900">
            {formatCurrency(atl, "$")}
          </p>
        </div>
      </div>
    </div>
  );
}

const MetricCard = ({
  label,
  value,
  rank,
}: {
  label: string;
  value: string;
  rank?: number;
}) => (
  <div className="rounded-lg border border-neutral-200 bg-white p-4">
    <span className="text-xs font-medium text-neutral-500">{label}</span>
    <div className="mt-1 flex items-baseline gap-2">
      <p className="text-lg font-semibold text-neutral-900">{value}</p>
      {rank && (
        <span className="text-xs text-neutral-400">#{rank}</span>
      )}
    </div>
  </div>
);

const SupplyRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex items-center justify-between rounded-lg border border-neutral-200 bg-white px-4 py-3">
    <span className="text-sm text-neutral-600">{label}</span>
    <span className="font-medium text-neutral-900">{value}</span>
  </div>
);

const PercentageBadge = ({ value }: { value: number }) => {
  const isPositive = value > 0;
  const isNegative = value < 0;
  const isNeutral = !isPositive && !isNegative;

  const formattedValue = `${isPositive ? "+" : isNegative ? "-" : ""}${Math.abs(
    value,
  ).toFixed(2)}%`;

  if (isNeutral) {
    return (
      <span className="inline-flex items-center rounded-md bg-neutral-100 px-2 py-1 text-sm font-medium text-neutral-600">
        {formattedValue}
      </span>
    );
  }

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-md px-2 py-1 text-sm font-semibold",
        isPositive
          ? "bg-success-50 text-success-700"
          : "bg-error-50 text-error-700",
      )}
    >
      {isPositive ? (
        <IoIosArrowRoundUp className="h-4 w-4" aria-hidden="true" />
      ) : (
        <IoIosArrowRoundDown className="h-4 w-4" aria-hidden="true" />
      )}
      {formattedValue}
    </span>
  );
};
