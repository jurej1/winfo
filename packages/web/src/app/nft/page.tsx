"use client";

import { ContractNftDisplayer } from "@/components/contract-nfts-displayer";
import { NftCollectionMetadata } from "@/components/nft-collection-metadata";

export default function Page() {
  return (
    <div className="m-auto mb-[64px] flex w-7xl flex-col gap-y-4">
      <NftCollectionMetadata />
      <ContractNftDisplayer />
    </div>
  );
}
