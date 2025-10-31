import { useCallback, useEffect, useState } from "react";
import { useAccount } from "wagmi";

import { useSwapTokens } from "./useSwapTokens";
import { useSwapQuote } from "./useSwapQuote";
import { TokenDBwithPrice } from "@w-info-sst/db";
import { GetQuote0XResponse } from "@w-info-sst/types";
export const useSwap = () => {
  const { address, chainId } = useAccount();

  const [sellToken, setSellToken] = useState<TokenDBwithPrice | undefined>();
  const [buyToken, setBuyToken] = useState<TokenDBwithPrice | undefined>();

  const [sellAmount, setSellAmount] = useState("0");

  const [quote, setQuote] = useState<GetQuote0XResponse | undefined>();

  const { data: tokens, isLoading: isLoadingTokens } = useSwapTokens();

  useEffect(() => {
    if (tokens && !isLoadingTokens) {
      const native = tokens.find((t) => t.native);
      setSellToken(native);

      const buyToken = tokens.find((t) => t.symbol === "USDT");
      setBuyToken(buyToken);
    }
  }, [tokens, setSellToken, setBuyToken, isLoadingTokens]);

  const { mutate: fetchQuote, isPending: isFetchingQuote } = useSwapQuote({
    onSuccess: (data) => setQuote(data),
  });

  useEffect(() => {
    if (!sellAmount || !buyToken || !chainId || !address || !sellToken) return;

    if (!(Number(sellAmount) > 0)) return;

    const handler = setTimeout(() => {
      const sellAmountInWei = BigInt(
        Math.floor(parseFloat(sellAmount) * Math.pow(10, sellToken.decimals)),
      );

      const params = {
        buyToken: buyToken.address,
        chainId: chainId,
        sellAmount: sellAmountInWei.toString(),
        sellToken: sellToken?.address,
        taker: address,
      };

      fetchQuote(params);
    }, 500);

    return () => clearTimeout(handler);
  }, [sellAmount, chainId, address, fetchQuote, sellToken, buyToken]);

  const swapTokens = useCallback(() => {
    let a = sellToken;
    let b = buyToken;

    setBuyToken(a);
    setSellToken(b);
  }, [sellToken, buyToken, setSellToken, setBuyToken]);

  return {
    sellToken,
    buyToken,
    setSellToken,
    setBuyToken,
    isFetchingQuote,
    quote,
    setSellAmount,
    isLoadingTokens,
    tokens: tokens ?? [],
    swapTokens,
    sellAmount,
  };
};
