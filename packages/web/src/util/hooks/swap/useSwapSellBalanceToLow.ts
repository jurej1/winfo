import { TokenDBwithPrice } from "@w-info-sst/db";
import { useEffect, useState } from "react";
import { Address } from "viem";

import { useAccount, useBalance } from "wagmi";

type UseSwapSellBalanceToLowProps = {
  token: TokenDBwithPrice | undefined;
  amount: string;
};

const nativeAddress = "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee";
export const useSwapSellBalanceToLow = ({
  token,
  amount,
}: UseSwapSellBalanceToLowProps) => {
  const [balanceToLow, setBalanceToLow] = useState(false);

  const { chainId, address } = useAccount();

  const { data: balance } = useBalance({
    token:
      token?.address === nativeAddress
        ? undefined
        : (token?.address as Address),
    address,
    chainId,
    query: {
      enabled: !!token,
    },
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
