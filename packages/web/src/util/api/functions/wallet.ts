import { GetWalletTokensResponse } from "@w-info-sst/types";

const API = process.env.NEXT_PUBLIC_API_URL;

export const fetchTokenBalancesByWallet = async (address: string) => {
  const response = await fetch(`${API}/wallet/${address}/tokens`);

  const body = await response.json();

  return body as GetWalletTokensResponse;
};
