import middy from "@middy/core";
import httpJsonBodyParser from "@middy/http-json-body-parser";
import validator from "@middy/validator";
import { transpileSchema } from "@middy/validator/transpile";
import {
  httpLambdaMiddleware,
  initMoralisMiddleware,
  MoralisRepository,
} from "@w-info-sst/core";
import { ApiGwRequest } from "@w-info-sst/types";

const schema = {
  type: "object",
  properties: {
    body: {
      type: "object",
      properties: {
        chains: {
          type: "array",
          items: {
            type: "string",
          },
        },
      },
    },
  },
};

const eventSchema = transpileSchema(schema);

const baseHandler = async (
  event: ApiGwRequest<{
    pathParameters: {
      address: string;
    };
    body: {
      chains?: string[];
    };
  }>,
) => {
  const { address } = event.pathParameters;

  const chains = event.body?.chains;

  const response = await MoralisRepository.getWalletNetWorth(address);

  return {
    statusCode: 200,
    body: response,
  };
};

export const handler = middy(baseHandler)
  .use(httpLambdaMiddleware())
  .use([
    httpJsonBodyParser({ disableContentTypeError: true }),
    validator({ eventSchema }),
  ])
  .use([initMoralisMiddleware()]);
