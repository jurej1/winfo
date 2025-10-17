"use client";

import { useTokensList } from "@/util/api/hooks/useTokensList";
import Image from "next/image";

type Props = {
  id: string;
};

export default function TokenDetails({ id }: Props) {
  const { data, isLoading, isError, error } = useTokensList();

  if (isLoading || !data) return <div>Loading data...</div>;
  if (isError) return <div>Error: ${error.message}</div>;

  const token = data.find((t) => t.id === id);

  if (!token) return <div>Token could not be found...</div>;

  return (
    <div className="flex w-full flex-col gap-y-2 rounded-2xl bg-gray-100 p-4">
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
