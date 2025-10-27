import { TokenDB } from "@w-info-sst/db";
import { TokenUniswap } from "@w-info-sst/types";
import { create } from "zustand";

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

export const useSwapStore = create<State & Action>((set, get) => ({
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
