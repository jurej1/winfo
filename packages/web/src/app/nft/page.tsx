import { ContractNftDisplayer } from "@/components/contract-nfts-displayer";
import { NftCollectionMetadata } from "@/components/nft-collection-metadata";
import { NftCollectionTransfers } from "@/components/nft-collection-transfers";
import { NftCollectionSales } from "@/components/nft-colllection-sales";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";

export default function Page() {
  const address = "0x80336ad7a747236ef41f47ed2c7641828a480baa";

  return (
    <div className="m-auto mb-[64px] flex w-7xl flex-col gap-y-4">
      {/* Header */}
      <NftCollectionMetadata />

      <Tabs defaultValue="nfts">
        {/* TABS */}
        <TabsList className="mb-2">
          <TabsTrigger value="nfts" asChild className="mr-1">
            <Button>Nfts</Button>
          </TabsTrigger>
          <TabsTrigger value="transfers" className="mr-1" asChild>
            <Button>Transfers</Button>
          </TabsTrigger>
          <TabsTrigger value="sales" asChild>
            <Button>Sales</Button>
          </TabsTrigger>
        </TabsList>
        {/* TabsContent */}
        <TabsContent value="nfts">
          <ContractNftDisplayer address={address} />
        </TabsContent>
        <TabsContent value="transfers">
          <NftCollectionTransfers address={address} />
        </TabsContent>
        <TabsContent value="sales">
          <NftCollectionSales address={address} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
