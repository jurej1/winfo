import { formatCurrency } from "@coingecko/cryptoformat";
import { TokenResult } from "@w-info-sst/types";
import { toast } from "sonner";
import { TableCell, TableRow } from "../ui/table";
import Image from "next/image";
import { IoIosArrowRoundDown, IoIosArrowRoundUp } from "react-icons/io";
import { Progress } from "../ui/progress";

type Props = {
  token: TokenResult;
};

export function PortfolioTokenCard({ token }: Props) {
  return (
    <TableRow>
      <TableCell>
        <div className="flex gap-1">
          {token.logo && (
            <Image
              src={token.logo}
              alt={token.name}
              width={15}
              height={15}
              className="object-contain"
            />
          )}
          {token.name}
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <span>{formatCurrency(token.usd_price, "$")}</span>
          <PriceChangeIndicator
            percentChange={token.usd_price_24hr_percent_change}
          />
        </div>
      </TableCell>
      <TableCell>
        {formatCurrency(Number(token.balance_formatted), "")}
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <span>{token.portfolio_percentage.toFixed(2)}%</span>
          <div className="w-10">
            <Progress value={token.portfolio_percentage} />
          </div>
        </div>
      </TableCell>
      <TableCell>{formatCurrency(token.usd_value, "$")}</TableCell>
    </TableRow>
  );
}

const PriceChangeIndicator = ({ percentChange }: { percentChange: number }) => {
  const color = () => {
    if (percentChange == 0) {
      return "";
    } else if (percentChange > 0) return "green";
    else return "red";
  };

  const Icon = () => {
    if (percentChange == 0) {
      return <></>;
    } else if (percentChange > 0) {
      return <IoIosArrowRoundUp color={color()} />;
    } else {
      return <IoIosArrowRoundDown color={color()} />;
    }
  };

  return (
    <div className="flex items-center">
      <Icon />
      <span style={{ color: color() }}>
        {Math.abs(percentChange).toFixed(2)}%
      </span>
    </div>
  );
};
