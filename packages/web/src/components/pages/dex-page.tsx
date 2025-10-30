import { DexRecentTransactions } from "@/components/dex-swap";
import { DexSwapCard } from "@/components/dex-swap/dex-swap-card";

export default function DexPage() {
  return (
    <div className="mx-auto my-3 flex max-w-7xl flex-col gap-2">
      <DexSwapCard />
      <DexRecentTransactions />
    </div>
  );
}
