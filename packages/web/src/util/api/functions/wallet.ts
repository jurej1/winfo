import {
  GetWalletNetWorthResponse,
  GetWalletTokensResponse,
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
