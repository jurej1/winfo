"use client";

import { Button } from "../ui/button";
import { useSwapExecute } from "@/util/hooks/swap/useSwapExecute";
import { Spinner } from "../ui/spinner";
import { useSwapStore } from "@/util/hooks/swap/useSwapStore";
import { useSwapSellBalanceToLow } from "@/util/hooks/swap/useSwapSellBalanceToLow";

export function DexConfirmSwapDialog() {
  const { executeSwapTransaction, loading, transaction } = useSwapExecute();

  const sellToken = useSwapStore((store) => store.sellToken);

  const balanceToLow = useSwapSellBalanceToLow();

  return (
    <Button
      className="w-full cursor-pointer py-7 text-lg"
      onClick={executeSwapTransaction}
      disabled={loading || !transaction || balanceToLow}
    >
      {balanceToLow ? (
        <p>Not enough {sellToken?.symbol}</p>
      ) : loading ? (
        <LoadingQuote />
      ) : (
        "Swap"
      )}
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
