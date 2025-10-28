import { useSwapStore } from "@/util/hooks/swap/useSwapStore";
import { Button } from "../ui/button";
import { useSendTransaction } from "wagmi";
import { useCallback } from "react";

export function DexConfirmSwapDialog() {
  const transaction = useSwapStore((state) => state.quote?.transaction);

  const loading = useSwapStore(
    (state) => state.loadingPrice || state.loadingQuote,
  );

  const { sendTransaction } = useSendTransaction();

  const executeTransaction = useCallback(() => {
    if (!transaction) return;
    sendTransaction(transaction);
  }, [sendTransaction, transaction]);

  return (
    <Button
      className="w-full py-7"
      onClick={executeTransaction}
      disabled={loading || !transaction}
    >
      SWAP
    </Button>
  );
}
