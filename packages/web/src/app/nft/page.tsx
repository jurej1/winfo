"use client";

import { ContractNftDisplayer } from "@/components/contract-nfts-displayer";
import { NftCollectionMetadata } from "@/components/nft-collection-metadata";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";

export default function Page() {
  return (
    <div className="m-auto mb-[64px] flex w-7xl flex-col gap-y-4">
      {/* Header */}
      <NftCollectionMetadata />

      <Tabs defaultValue="nfts" className="">
        {/* TABS */}
        <TabsList className="mb-2">
          <TabsTrigger value="nfts" asChild className="mr-1">
            <Button>Nfts</Button>
          </TabsTrigger>
          <TabsTrigger value="transfers" asChild>
            <Button>Transfers</Button>
          </TabsTrigger>
        </TabsList>
        {/* TabsContent */}
        <TabsContent value="nfts">
          <ContractNftDisplayer />
        </TabsContent>
        <TabsContent value="transfers"></TabsContent>
      </Tabs>
    </div>
  );
}
