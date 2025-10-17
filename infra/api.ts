import { coinGeckoAPIKey, moralisAPIKey } from "./secrets";

export const api = new sst.aws.ApiGatewayV2("WinfoAPI");

// GET wallet history
api.route("GET /wallet/{address}/history", {
  handler: "packages/functions/src/wallet/history/get.handler",
  link: [moralisAPIKey],
});

// GET token transfers
api.route("GET /wallet/{address}/token-transfers", {
  handler: "packages/functions/src/wallet/token-transfers/get.handler",
  link: [moralisAPIKey],
});

// GET nft transfers
api.route("GET /wallet/{address}/nft-transfers", {
  handler: "packages/functions/src/wallet/nft-transfers/get.handler",
  link: [moralisAPIKey],
});

// GET token wallances by wallet
api.route("GET /wallet/{address}/tokens", {
  handler: "packages/functions/src/wallet/tokens/get.handler",
  link: [moralisAPIKey],
});

// GET wallet net worth
api.route("GET /wallet/{address}/net-worth", {
  handler: "packages/functions/src/wallet/net-worth/get.handler",
  link: [moralisAPIKey],
});

// GET wallet approvals
api.route("GET /wallet/{address}/approvals", {
  handler: "packages/functions/src/wallet/approvals/get.handler",
  link: [moralisAPIKey],
});

// GET wallet profitability
api.route("GET /wallet/{address}/profitability", {
  handler: "packages/functions/src/wallet/profitability/get.handler",
  link: [moralisAPIKey],
});

// GET wallet profitability summary
api.route("GET /wallet/{address}/profitability-summary", {
  handler: "packages/functions/src/wallet/profitability-summary/get.handler",
  link: [moralisAPIKey],
});

// GET wallet stats
api.route("GET /wallet/{address}/stats", {
  handler: "packages/functions/src/wallet/stats/get.handler",
  link: [moralisAPIKey],
});

// TOKENS
api.route("GET /tokens", {
  handler: "packages/functions/src/tokens/price/get.handler",
  link: [coinGeckoAPIKey],
});

api.route("GET /tokens/list", {
  handler: "packages/functions/src/tokens/list/get.handler",
  link: [coinGeckoAPIKey],
});

api.route("GET /tokens/ohlc", {
  handler: "packages/functions/src/tokens/ohlc/get.handler",
  link: [coinGeckoAPIKey],
});

api.route("GET /tokens/market_data", {
  handler: "packages/functions/src/tokens/market_chart/get.handler",
  link: [coinGeckoAPIKey],
});

api.route("GET /tokens/search", {
  handler: "packages/functions/src/tokens/search/get.handler",
  link: [coinGeckoAPIKey],
});

api.route("GET /tokens/metadata", {
  handler: "packages/functions/src/tokens/metadata/get.handler",
  link: [moralisAPIKey, coinGeckoAPIKey],
});

api.route("GET /tokens/tickers", {
  handler: "packages/functions/src/tokens/tickers/get.handler",
  link: [coinGeckoAPIKey],
});
