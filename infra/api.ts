import { moralisAPIKey } from "./secrets";

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
