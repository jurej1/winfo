import { secrets } from "./secrets";

export const api = new sst.aws.ApiGatewayV2("WinfoAPI");

const link = secrets;

// SWAPS
api.route("GET /swap/price", {
  handler: "packages/functions/src/swap/price/get.handler",
  link,
});

api.route("GET /swap/quote", {
  handler: "packages/functions/src/swap/quote/get.handler",
  link,
});

api.route("GET /swap/tokens", {
  handler: "packages/functions/src/swap/tokens/get.handler",
  link,
});

// WALLET
api.route("POST /wallet", {
  handler: "packages/functions/src/wallet/add/post.handler",
  link,
});

api.route("GET /wallet/{address}/upload-url", {
  handler: "packages/functions/src/wallet/upload-url/get.handler",
  link,
});

api.route("GET /wallet/{address}/net-worth-history", {
  handler: "packages/functions/src/wallet/net-worth-history/get.handler",
  link,
});

api.route("GET /wallets", {
  handler: "packages/functions/src/wallet/wallets/get.handler",
  link,
});

// GET wallet history
api.route("GET /wallet/{address}/history", {
  handler: "packages/functions/src/wallet/history/get.handler",
  link,
});

// GET token transfers
api.route("GET /wallet/{address}/token-transfers", {
  handler: "packages/functions/src/wallet/token-transfers/get.handler",
  link,
});

// GET nft transfers
api.route("GET /wallet/{address}/nft-transfers", {
  handler: "packages/functions/src/wallet/nft-transfers/get.handler",
  link,
});

// GET token wallances by wallet
api.route("GET /wallet/{address}/tokens", {
  handler: "packages/functions/src/wallet/tokens/get.handler",
  link,
});

// GET wallet net worth
api.route("GET /wallet/{address}/net-worth", {
  handler: "packages/functions/src/wallet/net-worth/get.handler",
  link,
});

// GET wallet approvals
api.route("GET /wallet/{address}/approvals", {
  handler: "packages/functions/src/wallet/approvals/get.handler",
  link,
});

// GET wallet profitability
api.route("GET /wallet/{address}/profitability", {
  handler: "packages/functions/src/wallet/profitability/get.handler",
  link,
});

// GET wallet profitability summary
api.route("GET /wallet/{address}/profitability-summary", {
  handler: "packages/functions/src/wallet/profitability-summary/get.handler",
  link,
});

// GET wallet stats
api.route("GET /wallet/{address}/stats", {
  handler: "packages/functions/src/wallet/stats/get.handler",
  link,
});

// TOKENS
api.route("GET /tokens", {
  handler: "packages/functions/src/tokens/price/get.handler",
  link,
});

api.route("GET /tokens/list", {
  handler: "packages/functions/src/tokens/list/get.handler",
  link,
});

api.route("GET /tokens/ohlc", {
  handler: "packages/functions/src/tokens/ohlc/get.handler",
  link,
});

api.route("GET /tokens/market_data", {
  handler: "packages/functions/src/tokens/market_chart/get.handler",
  link,
});

api.route("GET /tokens/search", {
  handler: "packages/functions/src/tokens/search/get.handler",
  link,
});

api.route("GET /tokens/metadata", {
  handler: "packages/functions/src/tokens/metadata/get.handler",
  link,
});

api.route("GET /tokens/tickers", {
  handler: "packages/functions/src/tokens/tickers/get.handler",
  link,
});

////////
// NFTS
////////
api.route("GET /nfts/contract-nfts", {
  handler: "packages/functions/src/nfts/contract-nfts/get.handler",
  link,
});

api.route("GET /nfts/collection-metadata", {
  handler: "packages/functions/src/nfts/collection-metadata/get.handler",
  link,
});

api.route("GET /nfts/collection-transfers", {
  handler: "packages/functions/src/nfts/collection-transfers/get.handler",
  link,
});

api.route("GET /nfts/contract-sale-prices", {
  handler: "packages/functions/src/nfts/contract-sale-prices/get.handler",
  link,
});
