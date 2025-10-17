"use client";

import { FullNftData } from "@w-info-sst/types";
import { NftCard } from "./nft-card";
import { useEffect, useState } from "react";
type Props = {
  nfts: FullNftData[];
};

export function ContractNftDisplayer({ nfts }: Props) {
  return (
    <>
      <div className="m-auto mb-[64px] flex w-7xl">
        <div className="grid grid-cols-4 gap-6">
          {nfts.map((nft) => {
            return <NftCard key={nft.token_id} nft={nft} onClick={() => {}} />;
          })}
        </div>
      </div>
    </>
  );
}
