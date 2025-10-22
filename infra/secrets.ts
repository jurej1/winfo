import { imagesBucket } from "./bucket";

export const moralisAPIKey = new sst.Secret("MoralisAPIKey");
export const coinAPIKey = new sst.Secret("CoinAPIKey");
export const coinGeckoAPIKey = new sst.Secret("CoinGeckoAPIKey");
export const databaseUrl = new sst.Secret("DatabaseUrl");

export const reownProjectID = new sst.Secret("ReownProjectID");

export const secrets = [
  coinAPIKey,
  coinGeckoAPIKey,
  moralisAPIKey,
  databaseUrl,
  imagesBucket,
];
