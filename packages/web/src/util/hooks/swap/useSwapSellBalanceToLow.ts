import { TokenDBwithPrice } from "@w-info-sst/db";
import { useEffect, useState } from "react";

import { useAccount, useBalance } from "wagmi";

type UseSwapSellBalanceToLowProps = {
  token: TokenDBwithPrice | undefined;
  amount: string;
};

export const useSwapSellBalanceToLow = ({
  token,
  amount,
}: UseSwapSellBalanceToLowProps) => {
  const [balanceToLow, setBalanceToLow] = useState(false);

  const { chainId, address } = useAccount();

  const { data: balance } = useBalance({
    token: token?.native ? undefined : token?.address,
    address,
    chainId,
  });

  useEffect(() => {
    if (!balance) return;

    const balanceFormatted =
      Number(balance.value) / Math.pow(10, balance.decimals);

    if (balanceFormatted < Number(amount)) {
      setBalanceToLow(true);
    } else {
      setBalanceToLow(false);
    }
  }, [balance, amount, setBalanceToLow]);

  return balanceToLow;
};
