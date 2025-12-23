"use client";

import { Button } from "../ui/button";
import { useSwapExecute } from "@/util/hooks/swap/useSwapExecute";
import { Spinner } from "../ui/spinner";

import { TokenDBwithPrice } from "@w-info-sst/db";
import { GetQuote0XResponse } from "@w-info-sst/types";

type Props = {
  sellToken?: TokenDBwithPrice;
  balanceToLow: boolean;
  quote?: GetQuote0XResponse;
  loadingQuote: boolean;
};

export function DexConfirmSwapDialog({
  sellToken,
  balanceToLow,
  quote,
  loadingQuote,
}: Props) {
  const { executeSwapTransaction } = useSwapExecute({
    quote,
  });

  return (
    <Button
      variant="gradient"
      className="w-full cursor-pointer py-7 text-lg"
      onClick={executeSwapTransaction}
      disabled={loadingQuote || !quote?.transaction || balanceToLow}
    >
      {balanceToLow ? (
        <p>Not enough {sellToken?.symbol}</p>
      ) : loadingQuote ? (
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
