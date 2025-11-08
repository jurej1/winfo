import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { DexLimitOrderCard } from "../dex-limit-order/dex-limit-order-card";
import { DexSwapComponent } from "../dex-swap/dex-swap";
import { DexRecentTransactions } from "../dex-swap";
import { DexWalletLimitOrders } from "../dex-limit-order/dex-wallet-limit-orders";

export default function DexPage() {
  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6 p-6">
      <Tabs defaultValue="swap">
        <div className="mx-auto flex w-lg">
          <TabsList>
            <TabsTrigger value="swap">Swap</TabsTrigger>
            <TabsTrigger value="limit-order">Limit Order</TabsTrigger>
          </TabsList>
        </div>
        <div className="mt-4">
          <TabsContent value="swap">
            <div className="mx-auto w-lg">
              <DexSwapComponent />
            </div>
            <div className="mt-6">
              <DexRecentTransactions />
            </div>
          </TabsContent>
          <TabsContent value="limit-order">
            <div className="mx-auto w-lg">
              <DexLimitOrderCard />
            </div>
            <div className="mt-6">
              <DexWalletLimitOrders />
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
