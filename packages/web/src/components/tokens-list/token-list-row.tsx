"use client";

import { TokenListInfo } from "@w-info-sst/types";
import { TableCell, TableRow } from "../ui/table";
import Image from "next/image";
import { formatCurrency } from "@coingecko/cryptoformat";
import { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { IoIosArrowRoundDown, IoIosArrowRoundUp } from "react-icons/io";
import { Progress } from "../ui/progress";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

type Props = {
  token: TokenListInfo;
};

export function TokenListRow({ token }: Props) {
  const router = useRouter();

  const {
    id,
    image,
    name,
    symbol,
    current_price,
    price_change_percentage_24h,
    market_cap,
    total_volume,
    market_cap_rank,
    high_24h,
    low_24h,
    price_change_percentage_1h_in_currency,
    circulating_supply,
    total_supply,
    max_supply,
  } = token;

  const uppercaseSymbol = symbol.toUpperCase();

  const handleRowClick = useCallback(() => {
    router.push(`/token/${id}`);
  }, [router, id]);

  const formatLargeNumber = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      notation: "compact",
      maximumFractionDigits: 2,
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const supplyPercentage = useMemo(() => {
    if (max_supply && max_supply > 0) {
      const percentage = (circulating_supply / max_supply) * 100;
      return Math.min(percentage, 100); // Cap at 100%
    }
    return undefined;
  }, [max_supply, circulating_supply]);

  return (
    <TableRow
      onClick={handleRowClick}
      aria-label={`View ${name} token details`}
      className="group/row focus-visible:ring-primary cursor-pointer border-border transition-colors duration-150 hover:bg-accent-purple-50/50 dark:hover:bg-accent-purple-950/20 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white focus-visible:outline-none"
    >
      {/* Token */}
      <TableCell className="py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100 p-1.5">
            <Image
              src={image}
              alt={`${name} logo`}
              height={28}
              width={28}
              className="h-full w-full rounded-full object-contain"
              draggable="false"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-neutral-900">
              {name}
            </span>
            <div className="flex items-center gap-2 text-xs text-neutral-500 uppercase">
              <span>{uppercaseSymbol}</span>
              <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-[11px] font-medium text-neutral-600">
                #{market_cap_rank}
              </span>
            </div>
          </div>
        </div>
      </TableCell>
      {/* Price */}
      <TableCell className="py-4 text-sm font-semibold text-neutral-900">
        {formatCurrency(current_price, "$")}
      </TableCell>
      {/* Change 24h */}
      <TableCell className="py-4">
        <PercentageBadge value={price_change_percentage_24h} />
      </TableCell>
      {/* Change 1h */}
      <TableCell className="py-4">
        <PercentageBadge value={price_change_percentage_1h_in_currency} />
      </TableCell>
      {/* Market Cap */}
      <TableCell className="py-4 text-sm text-neutral-700">
        ${formatLargeNumber(market_cap)}
      </TableCell>
      {/* Total Volume */}
      <TableCell className="py-4 text-sm text-neutral-700">
        ${formatLargeNumber(total_volume)}
      </TableCell>
      {/* High 24h */}
      <TableCell className="py-4 text-sm font-medium text-neutral-700">
        {formatCurrency(high_24h, "$")}
      </TableCell>
      {/* Low 24h */}
      <TableCell className="py-4 text-sm font-medium text-neutral-700">
        {formatCurrency(low_24h, "$")}
      </TableCell>
      {/* Circulating Supply */}
      <TableCell className="py-4">
        {supplyPercentage !== undefined ? (
          <Tooltip>
            <TooltipTrigger className="w-full">
              <div className="flex flex-col gap-1.5 text-end text-sm text-neutral-700">
                <span>
                  {formatLargeNumber(circulating_supply)}{" "}
                  <span className="uppercase">{symbol}</span>
                </span>
                <Progress value={supplyPercentage} className="h-1.5" />
              </div>
            </TooltipTrigger>
            <TooltipContent className="w-72 space-y-3 border border-neutral-200 bg-white p-4 text-neutral-900 shadow-lg">
              <div className="space-y-1">
                <p className="text-xs font-semibold tracking-wide text-neutral-500 uppercase">
                  Token Supply Information
                </p>
                <p className="text-sm font-medium text-neutral-900">{name}</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-neutral-600">Circulating Supply</span>
                  <span className="font-medium text-neutral-900">
                    {formatLargeNumber(circulating_supply)} {uppercaseSymbol}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-neutral-600">Total Supply</span>
                  <span className="font-medium text-neutral-900">
                    {formatLargeNumber(total_supply)} {uppercaseSymbol}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-neutral-600">Max Supply</span>
                  <span className="font-medium text-neutral-900">
                    {formatLargeNumber(max_supply!)} {uppercaseSymbol}
                  </span>
                </div>
                <div className="border-t border-neutral-200 pt-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-neutral-700">
                      Circulation Progress
                    </span>
                    <span className="text-primary font-semibold">
                      {supplyPercentage.toFixed(2)}%
                    </span>
                  </div>
                </div>
                <Progress
                  value={supplyPercentage}
                  className="mt-2 h-2 bg-neutral-100"
                />
              </div>
            </TooltipContent>
          </Tooltip>
        ) : (
          <div className="text-end text-sm text-neutral-700">
            {formatLargeNumber(circulating_supply)}{" "}
            <span className="uppercase">{symbol}</span>
          </div>
        )}
      </TableCell>
    </TableRow>
  );
}

const PercentageBadge = ({ value }: { value: number }) => {
  const isPositive = value > 0;
  const isNegative = value < 0;
  const isNeutral = !isPositive && !isNegative;

  const formattedValue = `${isPositive ? "+" : isNegative ? "-" : ""}${Math.abs(
    value,
  ).toFixed(2)}%`;

  if (isNeutral) {
    return (
      <span className="inline-flex items-center rounded-md bg-neutral-100 px-2 py-0.5 text-xs font-medium text-neutral-600">
        {formattedValue}
      </span>
    );
  }

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-semibold",
        isPositive
          ? "bg-success-50 text-success-700"
          : "bg-error-50 text-error-700",
      )}
    >
      {isPositive ? (
        <IoIosArrowRoundUp className="h-3.5 w-3.5" aria-hidden="true" />
      ) : (
        <IoIosArrowRoundDown className="h-3.5 w-3.5" aria-hidden="true" />
      )}
      {formattedValue}
    </span>
  );
};
