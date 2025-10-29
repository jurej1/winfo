import { TokenDBwithPrice } from "@w-info-sst/db";
import { create } from "zustand";
import { GetPrice0XResponse, GetQuote0XResponse } from "@w-info-sst/types";
import { Address, formatEther } from "viem";

const initialState = {
  chainId: undefined as number | undefined,
  buyToken: undefined as TokenDBwithPrice | undefined,
  sellToken: undefined as TokenDBwithPrice | undefined,
  sellAmount: "0",
  buyAmount: "0",
  taker: undefined as Address | undefined,
  quote: undefined as GetQuote0XResponse | undefined,
  price: undefined as GetPrice0XResponse | undefined,
  tokens: [] as TokenDBwithPrice[],
  loadingPrice: false,
  loadingQuote: false,
  loadingTokens: true,
};

type State = typeof initialState;

type Action = {
  setChainId: (chainId?: number) => void;
  setBuyToken: (buyToken?: TokenDBwithPrice) => void;
  setSellToken: (sellToken?: TokenDBwithPrice) => void;
  setSellAmount: (sellAmount: string) => void;
  setBuyAmount: (buyAmount: string) => void;
  setTaker: (taker?: Address) => void;
  setQuote: (quote?: GetQuote0XResponse) => void;
  setPrice: (price?: GetPrice0XResponse) => void;
  setTokens: (tokens: TokenDBwithPrice[]) => void;
  resetStore: () => void;
  clearForm: () => void;
  setLoadingPrice: (val: boolean) => void;
  setLoadingQuote: (val: boolean) => void;
  setLoadingTokens: (val: boolean) => void;
  swapTokens: () => void;
};

export const useSwapStore = create<State & Action>((set) => ({
  ...initialState,

  setChainId: (chainId) => set({ chainId }),
  setBuyToken: (buyToken) => set({ buyToken }),
  setSellToken: (sellToken) => set({ sellToken }),
  setSellAmount: (sellAmount) => set({ sellAmount }),
  setBuyAmount: (buyAmount) => {
    set({ buyAmount: buyAmount });
  },
  setTaker: (taker) => set({ taker }),
  setQuote: (quote) => set({ quote }),
  setPrice: (price) => set({ price }),
  setTokens: (tokens) => set({ tokens }),

  setLoadingPrice: (loadingPrice) => set({ loadingPrice }),
  setLoadingQuote: (loadingQuote) => set({ loadingQuote }),
  setLoadingTokens: (loadingTokens) => set({ loadingTokens }),

  swapTokens: () =>
    set((state) => ({
      buyToken: state.sellToken,
      sellToken: state.buyToken,
    })),

  clearForm: () => {
    // TODO
  },
  resetStore: () => set(initialState),
}));
