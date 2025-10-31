import {
  GetPrice0XParams,
  GetPrice0XResponse,
  GetQuote0XParams,
  GetQuote0XResponse,
} from "@w-info-sst/types";

import {
  DexTransactionDB,
  InsertDexTransactionDB,
  TokenDB,
  TokenDBwithPrice,
} from "@w-info-sst/db";

const API = process.env.NEXT_PUBLIC_API_URL;

export const getPrice = async (params: GetPrice0XParams) => {
  const searchParams = new URLSearchParams({
    chainId: params.chainId.toString(),
    buyToken: params.buyToken,
    sellToken: params.sellToken,
    sellAmount: params.sellAmount,
    taker: params.taker,
  });

  const url = `${API}/swap/price?${searchParams}`;

  const response = await fetch(url);

  const body = await response.json();

  return body as GetPrice0XResponse;
};

export const getQuote = async (params: GetQuote0XParams) => {
  const searchParams = new URLSearchParams({
    chainId: params.chainId.toString(),
    buyToken: params.buyToken,
    sellToken: params.sellToken,
    sellAmount: params.sellAmount,
    taker: params.taker,
    slippageBps: params.slippageBps.toString(),
  });

  const url = `${API}/swap/quote?${searchParams}`;

  const response = await fetch(url);

  const body = await response.json();

  return body as GetQuote0XResponse;
};

export const getSwapTokensForChain = async (chain: number) => {
  const searchParams = new URLSearchParams({
    chain: chain.toString(),
  });

  const url = `${API}/swap/tokens?${searchParams}`;

  const response = await fetch(url);

  const body = await response.json();

  return body as TokenDBwithPrice[];
};

export const addSwapTransaction = async (tx: InsertDexTransactionDB) => {
  const url = `${API}/swap/transactions`;

  const response = await fetch(url, {
    body: JSON.stringify(tx),
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response;
};

export const getRecentDexTransactions = async (chain: number) => {
  const url = `${API}/swap/recent?chain=${chain}`;

  const response = await fetch(url);

  const body = await response.json();

  return body as DexTransactionDB[];
};
