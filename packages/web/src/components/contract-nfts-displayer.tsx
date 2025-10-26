"use client";

import { Address } from "viem";
import { NftCard } from "./nft-card";
import { useContractNFTs } from "@/util/hooks/useContractNfts";

type Props = {
  address: Address;
};

export function ContractNftDisplayer({ address }: Props) {
  const { data, isLoading, isError } = useContractNFTs(address);

  if (isLoading) return <div>NFT data is loading</div>;

  if (isError) return <div>There was an error loading nft data</div>;

  if (!data) return <div>Data is undefined</div>;

  return (
    <div className="grid grid-cols-4 gap-6">
      {data.result.map((nft) => {
        return <NftCard key={nft.token_id} nft={nft} onClick={() => {}} />;
      })}
    </div>
  );
}
