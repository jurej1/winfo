import middy from "@middy/core";
import { initMoralisMiddleware, MoralisRepository } from "@w-info-sst/core";
import {
  addManyWalletNetWorths,
  getWallets,
  InsertWalletNetWorth,
} from "@w-info-sst/db";

const baseHandler = async () => {
  console.log("Running cron job");

  const wallets = await getWallets();

  if (wallets.length === 0) return { statusCode: 200 };

  let netWorths: InsertWalletNetWorth[] = [];

  for (const { address } of wallets) {
    const response = await MoralisRepository.getWalletNetWorth(address);

    const chain = response.result.chains[0];

    netWorths.push({
      address: address,
      nativeBalance: chain.nativeBalance.toString(),
      nativeBalanceFormatted: chain.nativeBalanceFormatted,
      nativeBalanceUsd: chain.nativeBalanceUsd,
      networthUsd: chain.networthUsd,
      totalNetWorthUsd: response.result.totalNetworthUsd,
      tokenBalanceUsd: chain.tokenBalanceUsd,
    });
  }

  const response = await addManyWalletNetWorths(netWorths);

  return { statusCode: 200, body: JSON.stringify(response, null, 2) };
};

export const handler = middy(baseHandler).use([initMoralisMiddleware()]);
