import { useAccount } from "wagmi";
import { useSwapTokens } from "../swap/useSwapTokens";
import { useCallback, useEffect, useState } from "react";
import { TokenDBwithPrice } from "@w-info-sst/db";
import { CreateOneInchOrderParams } from "@w-info-sst/types";

export type LimitOrderExpiry = "1d" | "1w" | "1m" | "1y";

export const useLimitOrder = () => {
  const { address, chainId } = useAccount();

  const [sellToken, setSellToken] = useState<TokenDBwithPrice | undefined>(
    undefined,
  );

  const [sellAmount, setSellAmount] = useState("0");

  const [buyToken, setBuyToken] = useState<TokenDBwithPrice | undefined>(
    undefined,
  );

  const [buyAmount, setBuyAmount] = useState("0");

  const [expiry, setExpiry] = useState<LimitOrderExpiry>("1d");

  const {
    data: tokens,
    isLoading: isTokensLoading,
    isError: isTokensError,
    isSuccess: isTokensLoadSuccess,
  } = useSwapTokens();

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

  const calcualteExpiryAddOn = useCallback(() => {
    switch (expiry) {
      case "1d":
        return 60 * 60 * 24;
      case "1w":
        return 60 * 60 * 24 * 7;
      case "1m":
        return 60 * 60 * 24 * 30;
      case "1y":
        return 60 * 60 * 24 * 365;
      default:
        return 0;
    }
  }, [expiry]);

  const createLimitOrderParams = useCallback(() => {
    if (chainId && address && sellToken && buyToken) {
      const expiration = Date.now() / 1000 + calcualteExpiryAddOn();
      return {
        chainId,
        maker: address,
        makerAsset: sellToken.address,
        takerAsset: buyToken.address,
        makingAmount: sellAmount,
        takingAmount: buyAmount,
        expiration,
      } as CreateOneInchOrderParams;
    }
  }, [
    sellToken,
    buyToken,
    address,
    chainId,
    sellAmount,
    buyAmount,
    calcualteExpiryAddOn,
  ]);

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
    limitOrder: createLimitOrderParams,
  };
};
