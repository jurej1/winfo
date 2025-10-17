"use client";

import { NftCard } from "./nft-card";

import { useContractNFTs } from "@/util/api/hooks/useContractNfts";

export function ContractNftDisplayer() {
  const { data, isLoading, isError } = useContractNFTs(
    "0x524cab2ec69124574082676e6f654a18df49a048", // Pudgy pinguins
  );

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
