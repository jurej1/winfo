import { TokenDBwithPrice } from "@w-info-sst/db";
import { create } from "zustand";
import { GetPrice0XResponse, GetQuote0XResponse } from "@w-info-sst/types";
import { Address } from "viem";

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
  sellBalanceToLow: undefined as boolean | undefined,
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
  setSellBalanceToLow: (val?: boolean) => void;
  resetStore: () => void;
  clearForm: () => void;
  setLoadingPrice: (val: boolean) => void;
  setLoadingQuote: (val: boolean) => void;
  setLoadingTokens: (val: boolean) => void;
  swapTokens: () => void;
};

export const useSwapStore = create<State & Action>((set, get) => ({
  ...initialState,

  setChainId: (chainId) => set({ chainId }),
  setBuyToken: (buyToken) => {
    if (buyToken?.address !== get().sellToken?.address) set({ buyToken });
  },
  setSellToken: (sellToken) => {
    if (sellToken?.address !== get().buyToken?.address) set({ sellToken });
  },
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
  setSellBalanceToLow: (sellBalanceToLow) => set({ sellBalanceToLow }),

  swapTokens: () =>
    set((state) => ({
      buyToken: state.sellToken,
      sellToken: state.buyToken,
    })),

  clearForm: () => {
    set({
      sellAmount: "0",
      buyAmount: "0",
      quote: undefined,
      price: undefined,
      loadingPrice: false,
      loadingQuote: false,
      sellBalanceToLow: undefined,
    });
  },
  resetStore: () => set(initialState),
}));
