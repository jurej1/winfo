import middy from "@middy/core";
import validator from "@middy/validator";
import { transpileSchema } from "@middy/validator/transpile";
import { httpLambdaMiddleware, initMoralisMiddleware } from "@w-info-sst/core";
import { getTokensByChainId } from "@w-info-sst/db";
import { ApiGwRequest } from "@w-info-sst/types";

const schema = {
  type: "object",
  required: ["queryStringParameters"],
  properties: {
    queryStringParameters: {
      type: "object",
      required: ["chain"],
      properties: {
        chain: {
          type: "number",
        },
      },
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
  const chain = event.queryStringParameters.chain;

  const tokens = await getTokensByChainId(chain);

  return {
    statusCode: 200,
    body: tokens,
  };
};

export const handler = middy(baseHandler)
  .use(httpLambdaMiddleware())
  .use(initMoralisMiddleware())
  .use(validator({ eventSchema }));
