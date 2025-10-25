export type CoingeckoPriceResponse = {
  [coinId: string]: CoingeckoTokenSimple;
};

export type CoingeckoTokenSimple = {
  usd: number;
  usd_market_cap: number;
  usd_24h_vol: number;
  usd_24h_change: number;
  last_updated_at: number;
};
