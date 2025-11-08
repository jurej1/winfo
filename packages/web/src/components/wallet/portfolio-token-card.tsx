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
    <TableRow className="border-platinum-200 group/row transition-all duration-200 hover:bg-white/40">
      <TableCell className="py-4">
        <div className="flex items-center gap-3">
          {token.logo && (
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/80 p-1.5 shadow-sm transition-transform duration-200 group-hover/row:scale-110">
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
            <span className="text-onyx-DEFAULT font-semibold">
              {token.name}
            </span>
            <span className="text-slate_gray-DEFAULT text-xs uppercase">
              {token.symbol}
            </span>
          </div>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex flex-col gap-1">
          <span className="text-onyx-DEFAULT font-semibold">
            {formatCurrency(token.usd_price, "$")}
          </span>
          <PriceChangeIndicator
            percentChange={token.usd_price_24hr_percent_change}
          />
        </div>
      </TableCell>
      <TableCell>
        <span className="text-slate_gray-DEFAULT font-medium">
          {formatCurrency(Number(token.balance_formatted), "")}
        </span>
      </TableCell>
      <TableCell>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="text-onyx-DEFAULT font-semibold">
              {token.portfolio_percentage.toFixed(2)}%
            </span>
          </div>
          <Progress
            value={token.portfolio_percentage}
            className="bg-platinum-DEFAULT h-2 w-24"
          />
        </div>
      </TableCell>
      <TableCell className="text-right">
        <span className="text-onyx-DEFAULT text-lg font-bold">
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
      <span className="bg-platinum-300 inline-flex w-min items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold text-slate-200">
        0.00%
      </span>
    );
  }

  return (
    <span
      className={cn(
        "inline-flex w-min items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold",
        {
          "bg-green-100 text-green-700": isPositive,
          "bg-red-100 text-red-700": !isPositive,
        },
      )}
    >
      {isPositive ? (
        <IoIosArrowRoundUp className="h-4 w-4" />
      ) : (
        <IoIosArrowRoundDown className="h-4 w-4" />
      )}
      {Math.abs(percentChange).toFixed(2)}%
    </span>
  );
};
