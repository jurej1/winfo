import {
  GetWalletNetWorthResponse,
  GetWalletTokensResponse,
  WalletApprovalsResponse,
  WalletHistoryResponse,
} from "@w-info-sst/types";
import { add } from "date-fns";

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

export const fetchWalletHistory = async (
  address: Address,
  chain?: number,
  cursor?: string,
) => {
  const searchParams = new URLSearchParams({
    cursor: cursor ?? "",
    chain: `${chain}`,
  }).toString();

  const url = `${API}/wallet/${address}/history?${searchParams}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw Error("Response was not OK");
  }

  const body = await response.json();
  return body as WalletHistoryResponse;
};

export const fetchWalletApprovals = async (
  address: Address,
  chainId: number,
) => {
  const searchParams = new URLSearchParams({
    chain: chainId.toString(),
  }).toString();

  const response = await fetch(
    `${API}/wallet/${address}/approvals?${searchParams}`,
  );

  if (!response.ok) {
    throw Error("Response was not OK");
  }

  const body = await response.json();

  return body as WalletApprovalsResponse;
};
