import { useAccount } from "wagmi";
import { useSwapTokens } from "../swap/useSwapTokens";
import { useCallback, useEffect, useState } from "react";
import { TokenDBwithPrice } from "@w-info-sst/db";
import { CreateOneInchOrderParams } from "@w-info-sst/types";
import { useLocalizedFormatter } from "@/util/formatter/useLocalizedFormatter";

export type LimitOrderExpiry = "1d" | "1w" | "1m" | "1y";

export const RATIO_PERCENTAGES: number[] = [0.01, 0.05, 0.1];

export const useLimitOrder = () => {
  const { address, chainId } = useAccount();

  const [ratio, setRatio] = useState("0");
  const [ratioPercentage, setRatioPercentage] = useState<number>(0);

  const [sellToken, setSellToken] = useState<TokenDBwithPrice | undefined>(
    undefined,
  );

  const { formatNumberOrString } = useLocalizedFormatter();

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

  const calcMarketRatio = useCallback(() => {
    if (buyToken?.priceUsd && sellToken?.priceUsd) {
      return sellToken.priceUsd / buyToken.priceUsd;
    }
    return 0;
  }, [buyToken, sellToken]);

  const onRatioUpdated = useCallback(
    (val: string) => {
      const cleanedVal = val.replace(/,/g, "");
      setRatio(cleanedVal);

      const ratioNumber = Number(cleanedVal);

      const marketRatio = calcMarketRatio();

      const customRatioPercentage =
        ((ratioNumber - marketRatio) / marketRatio) * 100;

      setRatioPercentage(customRatioPercentage);

      const sellVal = Number(sellAmount);
      if (sellVal <= 0) return;

      const buyAmount = ratioNumber * sellVal;
      setBuyAmount(buyAmount.toString());
    },
    [setRatio, sellAmount, setBuyAmount, setRatioPercentage, calcMarketRatio],
  );

  useEffect(() => {
    if (tokens) {
      const native = tokens.find((token) => token.native);
      setSellToken(native);

      const usdt = tokens.find((token) => token.symbol === "USDT");
      setBuyToken(usdt);
    }
  }, [tokens, setBuyToken, setSellToken]);

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
      const sellVal = Number(sellAmount);
      const buyVal = Number(buyAmount);

      if (sellVal <= 0 || buyVal <= 0) return;

      const expiration = Math.floor(Date.now() / 1000 + calcualteExpiryAddOn());

      const makerAmountInWei = BigInt(
        Math.floor(sellVal * 10 ** sellToken.decimals),
      );
      const takerAmountInWei = BigInt(
        Math.floor(buyVal * 10 ** buyToken.decimals),
      );

      return {
        chainId,
        maker: address,
        makerAsset: sellToken.address,
        takerAsset: buyToken.address,
        makingAmount: makerAmountInWei.toString(),
        takingAmount: takerAmountInWei.toString(),
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

  useEffect(() => {
    if (buyToken?.priceUsd && sellToken?.priceUsd) {
      const ratio = sellToken.priceUsd / buyToken.priceUsd;

      const formatted = formatNumberOrString({ value: ratio });
      onRatioUpdated(formatted);
    }
  }, [buyToken, sellToken, onRatioUpdated]);

  const onSellAmountUpdated = useCallback(
    (val: string) => {
      // Remove commas from the input for formatting
      const cleanedVal = val.replace(/,/g, "");
      setSellAmount(cleanedVal);

      const buyAmount = Number(cleanedVal) * calcMarketRatio();

      setBuyAmount(buyAmount.toString());
    },
    [setSellAmount, ratio, calcMarketRatio, setBuyAmount],
  );

  const selectRatio = useCallback(
    (val: number) => {
      const multiplier = 1 + val;

      const newRatio = calcMarketRatio() * multiplier;

      const formatted = formatNumberOrString({ value: newRatio });

      onRatioUpdated(formatted);
    },
    [onRatioUpdated, calcMarketRatio],
  );

  const setSellTokenSafe = useCallback(
    (val: TokenDBwithPrice) => {
      if (val.address === buyToken?.address) return;
      setSellToken(val);
    },
    [setSellToken, buyToken],
  );

  const setBuyTokenSafe = useCallback(
    (val: TokenDBwithPrice) => {
      if (val.address === sellToken?.address) return;
      setBuyToken(val);
    },
    [setBuyToken, sellToken],
  );

  return {
    tokens: tokens ?? [],
    isTokensLoading,
    isTokensError,
    sellToken,
    setSellToken: setSellTokenSafe,
    buyToken,
    setBuyToken: setBuyTokenSafe,
    swapTokens,
    sellAmount,
    setSellAmount: onSellAmountUpdated,
    buyAmount,
    setBuyAmount,
    limitOrderParams: createLimitOrderParams,
    ratio,
    setRatio: onRatioUpdated,
    setExpiry,
    expiry,
    selectRatio,
    ratioPercentage,
  };
};
