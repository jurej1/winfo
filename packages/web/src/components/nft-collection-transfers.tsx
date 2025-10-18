"use client";

import { useNftCollectionTransfers } from "@/util/api/hooks/useNftCollectionTransfers";
import { NftTransactionCard } from "./nft-transaction-card";
import { Address } from "viem";

type Props = {
  address: Address;
};

export function NftCollectionTransfers({ address }: Props) {
  const { data, isLoading, isError } = useNftCollectionTransfers(address);

  if (isLoading) return <div>Loading nft transactions...</div>;

  if (isError) return <div>There was an error loading transactions...</div>;

  if (!data) return <div>Data is undefined</div>;

  return (
    <ul className="flex flex-col gap-2">
      {data.result.map((record) => (
        <NftTransactionCard
          key={`${record.transaction_hash}-${record.log_index}`}
          nft={record}
        />
      ))}
    </ul>
  );
}
