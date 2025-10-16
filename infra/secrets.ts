export const moralisAPIKey = new sst.Secret("MoralisAPIKey");
export const coinAPIKey = new sst.Secret("CoinAPIKey");
export const coinGeckoAPIKey = new sst.Secret("CoinGeckoAPIKey");

// Use CoinGeckoMarketCap instead because it is cheaper.
// use this
// https://docs.coingecko.com/v3.0.1/reference/coins-id-ohlc

// or this
// https://docs.coingecko.com/v3.0.1/reference/coins-id-market-chart?playground=open
