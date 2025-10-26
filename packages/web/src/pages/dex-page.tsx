"use client";

import { DexCardInput } from "@/components/dex/dex-card-input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useSwapPrice } from "@/util/hooks/useSwapPrice";
import { useSwapStore } from "@/util/hooks/useSwapStore";
import { useEffect } from "react";
import { useAccount } from "wagmi";

const DEBOUNCE_DELAY = 500;

export function DexPage() {
  const {
    setChainId,
    setTaker,
    sellToken,
    buyToken,
    sellAmount,
    buyAmount,
    setBuyAmount,
    setSellAmount,
    setBuyToken,
    setSellToken,
  } = useSwapStore();

  const { address, chainId } = useAccount();

  const { mutate: fetchPrice } = useSwapPrice({
    onSuccess: (data) => {
      setBuyAmount(data.buyAmount);
    },
  });

  useEffect(() => {
    setChainId(chainId);
    setTaker(address);
  }, [address, chainId, setChainId, setTaker]);

  useEffect(() => {
    if (!sellAmount || !buyToken || !chainId || !address) {
      return;
    }

    if (!(Number(sellAmount) > 0)) return;

    const handler = setTimeout(() => {
      fetchPrice({
        buyToken: buyToken.address,
        chainId: chainId,
        sellAmount: sellAmount,
        sellToken:
          sellToken?.address ?? "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
        taker: address,
      });
    }, DEBOUNCE_DELAY);

    return () => {
      clearTimeout(handler);
    };
  }, [sellToken, sellAmount, buyToken, chainId, address, fetchPrice]);

  return (
    <div className="mx-auto my-3 max-w-7xl">
      <Card className="mx-auto max-w-xl">
        <CardHeader>Swap Interface</CardHeader>

        <CardContent className="flex flex-col gap-2">
          <DexCardInput
            title="Sell"
            token={sellToken}
            value={sellAmount}
            onValChanged={setSellAmount}
            onSetToken={setSellToken}
          />
          <DexCardInput
            onSetToken={setBuyToken}
            title="Buy"
            value={buyAmount}
            token={buyToken}
            onValChanged={setBuyAmount}
          />
        </CardContent>
        <CardFooter>
          <p>Ready to swap.</p>
        </CardFooter>
      </Card>
    </div>
  );
}
