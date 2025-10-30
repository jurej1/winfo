import { useAccount } from "wagmi";
import { useSwapTokens } from "../swap/useSwapTokens";
import { useCallback, useEffect, useState } from "react";
import { TokenDBwithPrice } from "@w-info-sst/db";

export const useLimitOrder = () => {
  const { chainId } = useAccount();

  const [sellToken, setSellToken] = useState<TokenDBwithPrice | undefined>(
    undefined,
  );

  const [sellAmount, setSellAmount] = useState("0");

  const [buyToken, setBuyToken] = useState<TokenDBwithPrice | undefined>(
    undefined,
  );

  const [buyAmount, setBuyAmount] = useState("0");

  const {
    data: tokens,
    isLoading: isTokensLoading,
    isError: isTokensError,
    isSuccess: isTokensLoadSuccess,
  } = useSwapTokens(chainId);

  useEffect(() => {
    if (isTokensLoadSuccess && tokens) {
      const native = tokens.find((token) => token.native);
      setSellToken(native);

      const usdt = tokens.find((token) => token.symbol === "USDT");
      setBuyToken(usdt);
    }
  }, [isTokensLoadSuccess, tokens, setBuyToken, setSellToken]);

  const swapTokens = useCallback(() => {
    if (sellToken && buyToken) {
      let a = sellToken;
      let b = buyToken;

      setBuyToken(a);
      setSellToken(b);
    }
  }, [sellToken, buyToken, setSellToken, setBuyToken]);

  return {
    tokens: tokens ?? [],
    isTokensLoading,
    isTokensError,
    sellToken,
    setSellToken,
    buyToken,
    setBuyToken,
    swapTokens,
    sellAmount,
    setSellAmount,
    buyAmount,
    setBuyAmount,
  };
};
