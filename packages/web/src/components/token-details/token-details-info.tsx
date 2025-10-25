import { formatCurrency } from "@coingecko/cryptoformat";
import { TokenListInfo } from "@w-info-sst/types";
import Image from "next/image";

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
    high_24h,
    low_24h,
    price_change_24h,
  } = token;

  return (
    <div className="flex w-full flex-col gap-y-2 rounded-2xl bg-gray-100 p-4">
      <div className="flex items-center gap-3">
        <Image src={image} alt={name} height={30} width={30} />
        <h2 className="font-bold">{name}</h2>
        <h2 className="uppercase">{symbol}</h2>
      </div>

      <div>
        <p className="text-2xl font-semibold">
          {formatCurrency(current_price, "$", "en-US")}
        </p>
      </div>

      <div className="flex justify-between">
        <span>Market Cap</span>
        <span>{formatCurrency(market_cap, "$")}</span>
      </div>

      <div className="flex justify-between">
        <span>High (24h):</span>
        <span>{formatCurrency(high_24h, "$")}</span>
      </div>

      <div className="flex justify-between">
        <span>Low (24h): </span>
        <span>{formatCurrency(low_24h, "$")}</span>
      </div>

      <div className="flex justify-between">
        <span>Price Change (24h)</span>
        <span>{formatCurrency(price_change_24h, "$")}</span>
      </div>
    </div>
  );
}
