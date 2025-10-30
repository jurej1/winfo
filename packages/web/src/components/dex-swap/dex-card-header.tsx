"use client";

import { useSwapStore } from "@/util/hooks/swap/useSwapStore";
import { Spinner } from "../ui/spinner";

export function DexCardHeader() {
  const loading = useSwapStore((store) => store.loadingTokens);

  return (
    <div className="flex items-center justify-between">
      <span className="text-xl font-bold">Swap</span>

      {loading && <Spinner />}
    </div>
  );
}
