import { useEffect } from "react";
import { useAccount } from "wagmi";
import { useSwapStore } from "./useSwapStore";
import { formatEther } from "viem";

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
  } = store;

  useEffect(() => {
    if (tokensListData) {
      setTokens(tokensListData);

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
      const result = formatEther(BigInt(data.buyAmount));
      setBuyAmount(result);
      setPrice(data);
      setLoadingPrice(false);
    },
  });

  const { mutate: fetchQuote } = useSwapQuote({
    onMutate: () => setLoadingPrice(true),
    onSuccess: (data) => {
      setQuote(data);
      setLoadingPrice(false);
    },
  });

  useEffect(() => {
    if (!sellAmount || !buyToken || !chainId || !address || !sellToken) return;

    if (!(Number(sellAmount) > 0)) return;

    const handler = setTimeout(() => {
      console.log("fetchPrice invoked");
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
    sellToken?.address,
    sellAmount,
    buyToken?.address,
    chainId,
    address,
    fetchPrice,
  ]);

  return {
    ...store,
  };
};
