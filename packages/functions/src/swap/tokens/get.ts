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

  const tokenAddresses = response.map((token) => {
    const nativeCoingecko = "0x0000000000000000000000000000000000000000";
    return token.native ? nativeCoingecko : token.address;
  });

  const prices = await CoingeckoRepository.getCoinPriceDexByAddresses(
    "bsc",
    tokenAddresses,
  );

  const mappedTokens = response.map((token, index) => {
    return { ...token, priceUsd: prices[index] } as TokenDBwithPrice;
  });

  return {
    statusCode: 200,
    body: mappedTokens,
  };
};

export const handler = middy(baseHandler)
  .use(httpLambdaMiddleware())
  .use(validator({ eventSchema }));
