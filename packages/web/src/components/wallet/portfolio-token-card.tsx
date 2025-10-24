import { formatCurrency } from "@coingecko/cryptoformat";
import { TokenResult } from "@w-info-sst/types";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { Progress } from "../ui/progress";

type Props = {
  token: TokenResult;
};

export function PortfolioTokenCard({ token }: Props) {
  const format = (amount: string | number) => {
    return `${formatCurrency(Number(amount), "")}`;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(token.token_address);
    toast.success("Copied to clipboard");
  };

  return (
    <li className="shado flex flex-col gap-1 rounded-xl border-2 bg-white p-2">
      <div className="mb-2 flex gap-x-2">
        {token.logo && (
          <img
            src={token.logo}
            alt={token.name}
            draggable={false}
            height={20}
            width={20}
            className="object-contain"
          />
        )}
        <div className="font-bold">
          {token.name} ({token.symbol})
        </div>
        {token.native_token && (
          <img src={"badge.svg"} height={15} width={15} draggable={false} />
        )}
      </div>

      <div className="my-1 flex flex-col">
        <span className="text-xs text-gray-400">Address</span>
        <Button variant="link" onClick={copyToClipboard}>
          {token.token_address}
        </Button>
      </div>

      <span>
        Balance: {format(token.balance_formatted)} {token.symbol}
      </span>

      <span>Value: {format(token.usd_value)} USD</span>

      <span>Change (24h): {format(token.usd_price_24hr_usd_change)} USD</span>

      <Progress value={token.portfolio_percentage} />
    </li>
  );
}
