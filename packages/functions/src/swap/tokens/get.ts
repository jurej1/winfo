import middy from "@middy/core";
import validator from "@middy/validator";
import { transpileSchema } from "@middy/validator/transpile";
import { CoingeckoRepository, httpLambdaMiddleware } from "@w-info-sst/core";
import { getTokensByChainId, TokenDBwithPrice } from "@w-info-sst/db";
import { ApiGwRequest } from "@w-info-sst/types";

const schema = {
  type: "object",
  required: ["queryStringParameters"],
  properties: {
    queryStringParameters: {
      type: "object",
      properties: {
        chain: { type: "number" },
      },
      required: ["chain"],
    },
  },
};

const eventSchema = transpileSchema(schema);

const baseHandler = async (
  event: ApiGwRequest<{
    queryStringParameters: {
      chain: number;
    };
  }>,
) => {
  const { chain } = event.queryStringParameters;

  const response = await getTokensByChainId(chain);

  const nativeAddressDB = "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee";
  const nativeAddressCoingecko = "0x0000000000000000000000000000000000000000";

  const tokenAddresses = response.map((token) => {
    return token.address.toLowerCase() === nativeAddressDB.toLowerCase()
      ? nativeAddressCoingecko
      : token.address;
  });

  // CoinGecko API allows MAX 30 tokens per request
  const BATCH_SIZE = 30;
  const batches: string[][] = [];

  for (let i = 0; i < tokenAddresses.length; i += BATCH_SIZE) {
    batches.push(tokenAddresses.slice(i, i + BATCH_SIZE));
  }

  const batchPricesPromises = batches.map((batch) =>
    CoingeckoRepository.getCoinPriceDexByAddresses("bsc", batch),
  );

  const batchPricesResults = await Promise.all(batchPricesPromises);
  const allPrices = batchPricesResults.flat();

  const mappedTokens = response.map((token, index) => {
    return { ...token, priceUsd: allPrices[index] } as TokenDBwithPrice;
  });

  return {
    statusCode: 200,
    body: mappedTokens,
  };
};

export const handler = middy(baseHandler)
  .use(httpLambdaMiddleware())
  .use(validator({ eventSchema }));
