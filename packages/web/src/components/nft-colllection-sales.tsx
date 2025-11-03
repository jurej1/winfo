"use client";

import { useNftCollectionSalePrices } from "@/util/hooks/nft/useNftCollectionSalePrices";
import { Address } from "viem";

type Props = {
  address: Address;
};

export function NftCollectionSales({ address }: Props) {
  const { data, isLoading, error, isError } =
    useNftCollectionSalePrices(address);

  if (isLoading) return <div>Loading sales....</div>;

  if (isError) return <div>There is an error when loading sales...</div>;

  if (!data) return <div>Data is not defied</div>;

  function getTitleFromIndex(index: number) {
    switch (index) {
      case 0:
        return "Last Day";
      case 1:
        return "Last week";
      case 2:
        return "Last 30 days";
      case 3:
        return "Last 90 days";
    }
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      {data.map((info, index) => (
        <div
          key={`${info.total_trades}`}
          className="flex-col rounded-xl border p-4 shadow"
        >
          <h1 className="mb-1 font-bold uppercase">
            {getTitleFromIndex(index)}
          </h1>
          <div className="flex justify-between">
            <span>Last Sale:</span>
            {info.last_sale.price_formatted}
          </div>
          <div className="flex justify-between">
            <span>Lowest Sale:</span>
            {info.lowest_sale.price_formatted}
          </div>
          <div className="flex justify-between">
            <span>Highest Sale:</span>
            {info.highest_sale.price_formatted}
          </div>
          <div className="flex justify-between">
            <span>Average Sale:</span>
            {info.average_sale.price_formatted}
          </div>
          <div className="flex justify-between">
            <span>Total Trades:</span>
            {info.total_trades}
          </div>
        </div>
      ))}
    </div>
  );
}
