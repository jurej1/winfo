import { useEffect } from "react";
import { useAccount } from "wagmi";
import { useSwapStore } from "./useSwapStore";

import { useSwapPrice } from "./useSwapPrice";
import { useSwapTokens } from "./useSwapTokens";
import { useSwapQuote } from "./useSwapQuote";

export const useSwap = () => {
  const store = useSwapStore();
  const { address, chainId } = useAccount();

  const { data: tokensListData } = useSwapTokens(chainId!);

  const {
    setChainId,
    setTaker,
    sellToken,
    buyToken,
    sellAmount,
    setBuyAmount,
    setPrice,
    setTokens,
    setBuyToken,
    setSellToken,
    setQuote,
    setLoadingPrice,
    setLoadingQuote,
    setLoadingTokens,
  } = store;

  useEffect(() => {
    if (tokensListData) {
      setTokens(tokensListData);
      setLoadingTokens(false);

      const native = tokensListData.find((t) => t.native);
      setSellToken(native);

      const buyToken = tokensListData.find((t) => t.symbol === "USDT");
      setBuyToken(buyToken);
    }
  }, [tokensListData, setTokens, setSellToken, setBuyToken]);

  useEffect(() => {
    setChainId(chainId);
    setTaker(address);
  }, [address, chainId, setChainId, setTaker]);

  const { mutate: fetchPrice } = useSwapPrice({
    onMutate: () => setLoadingPrice(true),
    onSuccess: (data) => {
      setBuyAmount(data.buyAmount);
      setPrice(data);
      setLoadingPrice(false);
    },
  });

  const { mutate: fetchQuote } = useSwapQuote({
    onMutate: () => setLoadingQuote(true),
    onSuccess: (data) => (setQuote(data), setLoadingQuote(false)),
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

      fetchPrice(params);
      fetchQuote(params);
    }, 500);

    return () => clearTimeout(handler);
  }, [
    sellAmount,
    chainId,
    address,
    fetchPrice,
    fetchQuote,
    sellToken,
    buyToken,
  ]);

  return {
    ...store,
  };
};
