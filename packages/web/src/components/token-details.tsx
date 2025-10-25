"use client";

import { cn } from "@/lib/utils";
import { useTokensList } from "@/util/hooks/useTokensList";

import Image from "next/image";
import { Spinner } from "./ui/spinner";

type Props = {
  id: string;
  className?: string;
};

export default function TokenDetails({ id, className }: Props) {
  // THIS IS NOT NOT GOING TO work because what if the token is NOT in the first page of the list
  const { data, isLoading, isError } = useTokensList();

  if (isLoading) {
    return <Spinner className="mx-auto mt-2" />;
  }

  if (isError) {
    return <div className="mt-2">There was an error loading token data...</div>;
  }

  const token = data?.pages.flat().find((t) => t.id === id)!;

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
