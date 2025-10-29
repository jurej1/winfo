"use client";

import { Button } from "../ui/button";
import { useSwapExecute } from "@/util/hooks/swap/useSwapExecute";
import { Spinner } from "../ui/spinner";

export function DexConfirmSwapDialog() {
  const { executeSwapTransaction, loading, transaction } = useSwapExecute();

  return (
    <Button
      className="w-full cursor-pointer py-7 text-lg"
      onClick={executeSwapTransaction}
      disabled={loading || !transaction}
    >
      {loading && <LoadingQuote />}
      {!loading && "Swap"}
    </Button>
  );
}

const LoadingQuote = () => {
  return (
    <div className="flex items-center gap-2">
      <Spinner /> Loading Quote
    </div>
  );
};
