import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { DexLimitOrderCard } from "../dex-limit-order/dex-limit-order-card";
import { DexSwapComponent } from "../dex-swap/dex-swap";

export default function DexPage() {
  // <DexRecentTransactions />
  return (
    <div className="mx-auto my-3 flex max-w-7xl flex-col gap-2">
      <Tabs defaultValue="swap" className="mx-auto w-lg">
        <TabsList>
          <TabsTrigger value="swap">Swap</TabsTrigger>
          <TabsTrigger value="limit-order">Limit Order</TabsTrigger>
        </TabsList>
        <div>
          <TabsContent value="swap">
            <DexSwapComponent />
          </TabsContent>
          <TabsContent value="limit-order">
            <DexLimitOrderCard />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
