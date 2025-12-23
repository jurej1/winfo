import { formatCurrency } from "@coingecko/cryptoformat";
import { TokenResult } from "@w-info-sst/types";
import { TableCell, TableRow } from "../ui/table";
import Image from "next/image";
import { IoIosArrowRoundDown, IoIosArrowRoundUp } from "react-icons/io";
import { Progress } from "../ui/progress";
import { cn } from "@/lib/utils";

type Props = {
  token: TokenResult;
};

export function PortfolioTokenCard({ token }: Props) {
  return (
    <TableRow className="group/row border-border transition-all duration-150 hover:bg-accent-purple-50/50 dark:hover:bg-accent-purple-950/20">
      <TableCell className="py-4">
        <div className="flex items-center gap-3">
          {token.logo && (
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100 p-1.5">
              <Image
                src={token.logo}
                alt={token.name}
                width={28}
                height={28}
                className="object-contain"
                draggable="false"
              />
            </div>
          )}
          <div className="flex flex-col">
            <span className="text-primary-dark-900 font-medium">
              {token.name}
            </span>
            <span className="text-xs text-neutral-500 uppercase">
              {token.symbol}
            </span>
          </div>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex flex-col gap-1">
          <span className="text-primary-dark-900 font-medium">
            {formatCurrency(token.usd_price, "$")}
          </span>
          <PriceChangeIndicator
            percentChange={token.usd_price_24hr_percent_change}
          />
        </div>
      </TableCell>
      <TableCell>
        <span className="font-medium text-neutral-600">
          {formatCurrency(Number(token.balance_formatted), "")}
        </span>
      </TableCell>
      <TableCell>
        <div className="flex flex-col gap-2">
          <span className="text-primary-dark-900 font-medium">
            {token.portfolio_percentage.toFixed(2)}%
          </span>
          <Progress
            value={token.portfolio_percentage}
            className="h-2 w-24 bg-neutral-100"
          />
        </div>
      </TableCell>
      <TableCell className="text-right">
        <span className="text-primary-dark-900 text-base font-semibold">
          {formatCurrency(token.usd_value, "$")}
        </span>
      </TableCell>
    </TableRow>
  );
}

const PriceChangeIndicator = ({ percentChange }: { percentChange: number }) => {
  const isPositive = percentChange > 0;
  const isNeutral = percentChange === 0;

  if (isNeutral) {
    return (
      <span className="inline-flex w-min items-center gap-1 rounded-md bg-neutral-100 px-2 py-0.5 text-xs font-medium text-neutral-600">
        0.00%
      </span>
    );
  }

  return (
    <span
      className={cn(
        "inline-flex w-min items-center gap-1 rounded-md px-2 py-0.5 text-xs font-medium",
        {
          "bg-success-50 text-success-700": isPositive,
          "bg-error-50 text-error-700": !isPositive,
        },
      )}
    >
      {isPositive ? (
        <IoIosArrowRoundUp className="h-3.5 w-3.5" />
      ) : (
        <IoIosArrowRoundDown className="h-3.5 w-3.5" />
      )}
      {Math.abs(percentChange).toFixed(2)}%
    </span>
  );
};
