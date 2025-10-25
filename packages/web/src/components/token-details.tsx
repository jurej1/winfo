"use client";

import { cn } from "@/lib/utils";
import { TokenListInfo } from "@w-info-sst/types";
import Image from "next/image";

type Props = {
  token: TokenListInfo;
  className?: string;
};

export default function TokenDetails({ token, className }: Props) {
  return (
    <div
      className={cn(
        "flex w-full flex-col gap-y-2 rounded-2xl bg-gray-100 p-4",
        className,
      )}
    >
      <div className="flex items-center gap-3">
        <Image src={token.image} alt={token.name} height={30} width={30} />
        <h2 className="font-bold">{token.name}</h2>
        <h2 className="uppercase">{token.symbol}</h2>
      </div>

      <div>
        <h2 className="text-2xl font-semibold">${token.current_price}</h2>
      </div>

      <div className="flex justify-between">
        <span>Market Cap</span>
        <span>{token.market_cap}</span>
      </div>

      <div className="flex justify-between">
        <span>High (24h):</span>
        <span>{token.high_24h}</span>
      </div>

      <div className="flex justify-between">
        <span>Low (24h): </span>
        <span>{token.low_24h}</span>
      </div>

      <div className="flex justify-between">
        <span>Price Change (24h)</span>
        <span>{token.price_change_24h}</span>
      </div>
    </div>
  );
}
