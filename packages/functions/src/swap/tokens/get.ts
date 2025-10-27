import middy from "@middy/core";
import validator from "@middy/validator";
import { transpileSchema } from "@middy/validator/transpile";
import { httpLambdaMiddleware } from "@w-info-sst/core";
import { getTokensByChainId } from "@w-info-sst/db";
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

  return {
    statusCode: 200,
    body: response,
  };
};

export const handler = middy(baseHandler)
  .use(httpLambdaMiddleware())
  .use(validator({ eventSchema }));
