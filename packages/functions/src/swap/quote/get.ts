import middy from "@middy/core";
import validator from "@middy/validator";
import { httpLambdaMiddleware, ZeroXRepository } from "@w-info-sst/core";
import { ApiGwRequest, GetQuote0XParams } from "@w-info-sst/types";

import { transpileSchema } from "@middy/validator/transpile";

const schema = {
  type: "object",
  properties: {
    queryStringParameters: {
      type: "object",
      properties: {
        sellToken: { type: "string" },
        buyToken: { type: "string" },
        sellAmount: { type: "string" },
        chainId: { type: "number" },
        taker: { type: "string" },
      },
      required: ["sellToken", "buyToken", "sellAmount", "chainId", "taker"],
    },
  },
  required: ["queryStringParameters"],
};

const eventSchema = transpileSchema(schema);

const baseHandler = async (
  event: ApiGwRequest<{
    queryStringParameters: GetQuote0XParams;
  }>,
) => {
  const params = event.queryStringParameters;

  const response = await ZeroXRepository.getQuote(params);

  return {
    statusCode: 200,
    body: response,
  };
};

export const handler = middy(baseHandler).use(httpLambdaMiddleware()).use(
  validator({
    eventSchema,
  }),
);
