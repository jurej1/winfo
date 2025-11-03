import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { DexLimitOrderCard } from "../dex-limit-order/dex-limit-order-card";
import { DexSwapComponent } from "../dex-swap/dex-swap";
import { DexRecentTransactions } from "../dex-swap";
import { DexWalletLimitOrders } from "../dex-limit-order/dex-wallet-limit-orders";

export default function DexPage() {
  // <DexRecentTransactions />
  return (
    <div className="mx-auto my-3 flex max-w-7xl flex-col gap-2">
      <Tabs defaultValue="swap">
        <div className="mx-auto flex w-lg">
          <TabsList>
            <TabsTrigger value="swap">Swap</TabsTrigger>
            <TabsTrigger value="limit-order">Limit Order</TabsTrigger>
          </TabsList>
        </div>
        <div>
          <TabsContent value="swap">
            <div className="mx-auto w-lg">
              <DexSwapComponent />
            </div>
            <DexRecentTransactions />
          </TabsContent>
          <TabsContent value="limit-order">
            <div className="mx-auto w-lg">
              <DexLimitOrderCard />
            </div>
            <DexWalletLimitOrders />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
