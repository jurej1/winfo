import { TokenDB } from "@w-info-sst/db";
import { useEffect } from "react";
import { useAccount } from "wagmi";
import { create } from "zustand";
import { useSwapPrice } from "./useSwapPrice";
import { formatEther } from "viem";

type Address = `0x${string}`;

type State = {
  chainId?: number;
  buyToken?: TokenDB;
  sellToken?: TokenDB;
  sellAmount: string;
  buyAmount: string;
  taker?: Address;
};

type Action = {
  setChainId: (chainId?: number) => void;
  setBuyToken: (buyToken?: TokenDB) => void;
  setSellToken: (sellToken?: TokenDB) => void;
  setSellAmount: (sellAmount: string) => void;
  setBuyAmount: (buyAmount: string) => void;
  setTaker: (taker?: Address) => void;
};

const useSwapStore = create<State & Action>((set, get) => ({
  chainId: undefined,
  buyToken: undefined,
  sellToken: undefined,
  sellAmount: "0",
  buyAmount: "0",
  taker: undefined,
  setChainId: (chainId) => set({ chainId }),
  setBuyToken: (buyToken) => set({ buyToken }),
  setSellToken: (sellToken) => set({ sellToken }),
  setSellAmount: (sellAmount) => set({ sellAmount }),
  setBuyAmount: (buyAmount) => set({ buyAmount }),
  setTaker: (taker) => set({ taker }),
}));

export const useSwap = () => {
  const store = useSwapStore();

  const {
    setChainId,
    setTaker,
    sellToken,
    buyToken,
    sellAmount,
    setBuyAmount,
  } = store;

  const { address, chainId } = useAccount();

  useEffect(() => {
    setChainId(chainId);
    setTaker(address);
  }, [address, chainId, setChainId, setTaker]);

  const { mutate: fetchPrice } = useSwapPrice({
    onSuccess: (data) => {
      const result = formatEther(data.buyAmount as bigint);
      setBuyAmount(result);
    },
  });

  useEffect(() => {
    if (!sellAmount || !buyToken || !chainId || !address || !sellToken) {
      return;
    }

    if (!(Number(sellAmount) > 0)) return;

    const handler = setTimeout(() => {
      const sellAmountInWei = BigInt(
        Math.floor(parseFloat(sellAmount) * Math.pow(10, sellToken.decimals)),
      );

      fetchPrice({
        buyToken: buyToken.address,
        chainId: chainId,
        sellAmount: sellAmountInWei.toString(),
        sellToken: sellToken?.address,
        taker: address,
      });
    }, 500);

    return () => clearTimeout(handler);
  }, [sellToken, sellAmount, buyToken, chainId, address, fetchPrice]);

  return {
    ...store,
  };
};
