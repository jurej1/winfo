import middy from "@middy/core";
import validator from "@middy/validator";
import { transpileSchema } from "@middy/validator/transpile";
import { httpLambdaMiddleware, ZeroXRepository } from "@w-info-sst/core";
import { ApiGwRequest, GetPrice0XParams } from "@w-info-sst/types";

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
    queryStringParameters: GetPrice0XParams;
  }>,
) => {
  const params = event.queryStringParameters;

  const response = await ZeroXRepository.getPrice(params);

  return {
    statusCode: 200,
    body: response,
  };
};

export const handler = middy(baseHandler)
  .use(httpLambdaMiddleware())
  .use(validator({ eventSchema }));
