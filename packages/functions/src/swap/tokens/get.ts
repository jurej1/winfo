import middy from "@middy/core";
import validator from "@middy/validator";
import { transpileSchema } from "@middy/validator/transpile";
import { httpLambdaMiddleware, UniswapRepository } from "@w-info-sst/core";
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

  const response = await UniswapRepository.getTokens();

  const filteredTokens = response.filter((token) => token.chainId === chain);

  const limitedTokens = filteredTokens.slice(0, 20);

  return {
    statusCode: 200,
    body: limitedTokens,
  };
};

export const handler = middy(baseHandler)
  .use(httpLambdaMiddleware())
  .use(validator({ eventSchema }));
