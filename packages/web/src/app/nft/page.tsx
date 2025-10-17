"use client";

import { ContractNftDisplayer } from "@/components/contract-nfts-displayer";
import { useContractNFTs } from "@/util/api/hooks/useContractNfts";

export default function Page() {
  const { data, isLoading, isError } = useContractNFTs(
    "0x524cab2ec69124574082676e6f654a18df49a048",
  );

  if (isLoading) return <div>NFT data is loading</div>;

  if (isError) return <div>There was an error loading nft data</div>;

  if (!data) return <div>Data is undefined</div>;

  return <ContractNftDisplayer nfts={data.result} />;
}
