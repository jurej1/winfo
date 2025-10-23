import {
  GetWalletNetWorthResponse,
  GetWalletTokensResponse,
  WalletHistoryResponse,
} from "@w-info-sst/types";

import { Address } from "viem";

const API = process.env.NEXT_PUBLIC_API_URL;

export const fetchTokenBalancesByWallet = async (address: Address) => {
  const response = await fetch(`${API}/wallet/${address}/tokens`);

  if (!response.ok) {
    throw Error("Response was not ok");
  }

  const body = await response.json();

  return body as GetWalletTokensResponse;
};

export const fetchWalletNetWorth = async (address: Address) => {
  const response = await fetch(`${API}/wallet/${address}/net-worth`);

  if (!response.ok) {
    throw Error("Response was not ok");
  }

  const body = await response.json();

  return body as GetWalletNetWorthResponse;
};

export const fetchWalletHistory = async (address: Address, cursor?: string) => {
  const searchParams = new URLSearchParams();

  let url = `${API}/wallet/${address}/history`;

  if (cursor) {
    searchParams.set("cursor", cursor);

    const queryString = searchParams.toString();
    url += `?${queryString}`;
  }

  const response = await fetch(url);

  if (!response.ok) {
    throw Error("Response was not OK");
  }

  const body = await response.json();
  return body as WalletHistoryResponse;
};
