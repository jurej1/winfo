import { TokenDB } from "@w-info-sst/db";
import { create } from "zustand";
import { GetPrice0XResponse, GetQuote0XResponse } from "@w-info-sst/types";

type Address = `0x${string}`;

type State = {
  chainId?: number;
  buyToken?: TokenDB;
  sellToken?: TokenDB;
  sellAmount: string;
  buyAmount: string;
  taker?: Address;
  quote?: GetQuote0XResponse;
  price?: GetPrice0XResponse;
  tokens: TokenDB[];
};

type Action = {
  setChainId: (chainId?: number) => void;
  setBuyToken: (buyToken?: TokenDB) => void;
  setSellToken: (sellToken?: TokenDB) => void;
  setSellAmount: (sellAmount: string) => void;
  setBuyAmount: (buyAmount: string) => void;
  setTaker: (taker?: Address) => void;
  setQuote: (quote?: GetQuote0XResponse) => void;
  setPrice: (price?: GetPrice0XResponse) => void;
  setTokens: (tokens: TokenDB[]) => void;
};

export const useSwapStore = create<State & Action>((set, get) => ({
  chainId: undefined,
  buyToken: undefined,
  sellToken: undefined,
  sellAmount: "0",
  buyAmount: "0",
  taker: undefined,
  quote: undefined,
  price: undefined,
  tokens: [],
  setChainId: (chainId) => set({ chainId }),
  setBuyToken: (buyToken) => set({ buyToken }),
  setSellToken: (sellToken) => set({ sellToken }),
  setSellAmount: (sellAmount) => set({ sellAmount }),
  setBuyAmount: (buyAmount) => set({ buyAmount }),
  setTaker: (taker) => set({ taker }),
  setQuote: (quote) => set({ quote }),
  setPrice: (price) => set({ price }),
  setTokens: (tokens) => set({ tokens }),
}));
