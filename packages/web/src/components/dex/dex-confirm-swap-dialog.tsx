"use client";

import { Button } from "../ui/button";
import { useSwapExecute } from "@/util/hooks/swap/useSwapExecute";

export function DexConfirmSwapDialog() {
  const {
    isApprovalNeeded,
    executeSwapTransaction,
    loading,
    transaction,
    sellToken,
    sellAmount,
  } = useSwapExecute();

  if (isApprovalNeeded) {
    return (
      <Button
        className="w-full py-7"
        onClick={executeSwapTransaction}
        disabled={loading || !sellToken || parseFloat(sellAmount) <= 0}
      >
        Approve {sellToken?.symbol || "Token"}
      </Button>
    );
  }

  return (
    <Button
      className="w-full cursor-pointer py-7"
      onClick={executeSwapTransaction}
      disabled={loading || !transaction}
    >
      SWAP
    </Button>
  );
}
