import { secrets } from "./secrets";

export const walletNetWorthsCron = new sst.aws.Cron("WalletNetWorths", {
  function: {
    handler: "packages/functions/src/wallet/net-worth-cron/handler.handler",
    timeout: "60 seconds",
    link: secrets,
  },
  // day of the week: ?
  // aws requires for day of the week or day of month to be "?" and other one "*"
  schedule: "cron(0 * * * ? *)",
});
