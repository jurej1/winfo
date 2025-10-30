import { useEffect, useState } from "react";
import { useSwapStore } from "./useSwapStore";
import { useAccount, useBalance } from "wagmi";

export const useSwapSellBalanceToLow = () => {
  const [balanceToLow, setBalanceToLow] = useState(false);

  const sellToken = useSwapStore((store) => store.sellToken);
  const sellAmount = useSwapStore((store) => store.sellAmount);

  const { chainId, address } = useAccount();

  const { data: balance } = useBalance({
    token: sellToken?.native ? undefined : sellToken?.address,
    address,
    chainId,
  });

  useEffect(() => {
    if (!balance) return;

    const balanceFormatted =
      Number(balance.value) / Math.pow(10, balance.decimals);

    if (balanceFormatted < Number(sellAmount)) {
      setBalanceToLow(true);
    } else {
      setBalanceToLow(false);
    }
  }, [balance, sellAmount, setBalanceToLow]);

  return balanceToLow;
};
