import middy from "@middy/core";
import validator from "@middy/validator";
import { transpileSchema } from "@middy/validator/transpile";
import { CoingeckoRepository, httpLambdaMiddleware } from "@w-info-sst/core";
import { ApiGwRequest } from "@w-info-sst/types";

const schema = {
  type: "object",
  required: ["pathParameters"],
  properties: {
    pathParameters: {
      type: "object",
      required: ["id"],
      properties: {
        id: {
          type: "string",
        },
      },
    },
  },
};

const eventSchema = transpileSchema(schema);

const baseHandler = async (
  event: ApiGwRequest<{
    pathParameters: {
      id: string;
    };
  }>,
) => {
  const coinid = event.pathParameters.id;

  const response = await CoingeckoRepository.getCoinData(coinid);

  return {
    statusCode: 200,
    body: response,
  };
};
export const handler = middy(baseHandler)
  .use(httpLambdaMiddleware())
  .use(validator({ eventSchema }));
