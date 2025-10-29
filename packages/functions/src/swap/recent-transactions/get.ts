import middy from "@middy/core";
import validator from "@middy/validator";
import { transpileSchema } from "@middy/validator/transpile";
import { httpLambdaMiddleware } from "@w-info-sst/core";
import { getRecentTransactions } from "@w-info-sst/db";
import { ApiGwRequest } from "@w-info-sst/types";

const schema = {
  type: "object",
  required: ["queryStringParameters"],
  properties: {
    queryStringParameters: {
      type: "object",
      required: ["chain"],
      properties: {
        chain: { type: "number" },
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
  const { chain } = event.queryStringParameters;

  const response = await getRecentTransactions(chain);

  return {
    statusCode: 200,
    body: response,
  };
};

export const handler = middy(baseHandler)
  .use(httpLambdaMiddleware())
  .use(validator({ eventSchema }));
