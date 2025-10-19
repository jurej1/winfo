export interface ChainNetWorth {
  chain: string;
  native_balance: string;
  native_balance_formatted: string;
  native_balance_usd: string;
  token_balance_usd: string;
  networth_usd: string;
}

export interface GetWalletNetWorthResponse {
  total_networth_usd: string;
  chains: ChainNetWorth[];
}
