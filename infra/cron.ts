import { secrets } from "./secrets";

export const walletNetWorthsCron = new sst.aws.Cron("WalletNetWorths", {
  function: {
    handler: "packages/functions/src/wallet/net-worth-cron/handler.handler",
    timeout: "60 seconds",
    link: secrets,
  },
  schedule: "cron(0 * * * *)",
});
