import { DexRecentTransactions } from "@/components/dex";
import { DexSwapCard } from "@/components/dex/dex-swap-card";

export function DexPage() {
  return (
    <div className="mx-auto my-3 flex max-w-7xl flex-col gap-2">
      <DexSwapCard />
      <DexRecentTransactions />
    </div>
  );
}
