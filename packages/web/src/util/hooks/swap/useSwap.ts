import { useCallback, useEffect, useState } from "react";
import { useAccount } from "wagmi";

import { useSwapTokens } from "./useSwapTokens";
import { useSwapQuote } from "./useSwapQuote";
import { TokenDBwithPrice } from "@w-info-sst/db";
import { GetQuote0XParams, GetQuote0XResponse } from "@w-info-sst/types";

const DEFAULT_SLIPPAGE = 100;
const MAX_SLIPPAGE = 10000;

export const useSwap = () => {
  const { address, chainId } = useAccount();

  const [sellToken, setSellToken] = useState<TokenDBwithPrice | undefined>();
  const [buyToken, setBuyToken] = useState<TokenDBwithPrice | undefined>();

  const [sellAmount, setSellAmount] = useState("0");

  const [quote, setQuote] = useState<GetQuote0XResponse | undefined>();

  const [slippage, setSlippage] = useState<number>(DEFAULT_SLIPPAGE);

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
        slippageBps: slippage,
      } as GetQuote0XParams;

      fetchQuote(params);
    }, 500);

    return () => clearTimeout(handler);
  }, [sellAmount, chainId, address, fetchQuote, sellToken, buyToken, slippage]);

  const swapTokens = useCallback(() => {
    let a = sellToken;
    let b = buyToken;

    setBuyToken(a);
    setSellToken(b);
  }, [sellToken, buyToken, setSellToken, setBuyToken]);

  const formattedSlippage = useCallback(() => {
    return (slippage / MAX_SLIPPAGE) * 100;
  }, [slippage, MAX_SLIPPAGE]);

  const setSlippagePercentage = useCallback(
    (val: number) => {
      const percentage = val / 100;
      setSlippage(percentage * MAX_SLIPPAGE);
    },
    [setSlippage, MAX_SLIPPAGE],
  );

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
    slippage: formattedSlippage(),
    setSlippage: setSlippagePercentage,
  };
};
