export const api = new sst.aws.ApiGatewayV2("WinfoAPI");

// GET wallet history
api.route("GET /wallet/{address}/history", {
  handler: "",
});
