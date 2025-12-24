import middy from "@middy/core";
import validator from "@middy/validator";
import { transpileSchema } from "@middy/validator/transpile";
import { httpLambdaMiddleware, SwingRepository } from "@w-info-sst/core";
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

  const chainSlug = () => {
    switch (chain) {
      case 56:
        return "bsc";
      case 1:
        return "ethereum";
      default:
        return "ethereum";
    }
  };

  const tokens = await SwingRepository.getEnabledTokens(chainSlug());

  return {
    statusCode: 200,
    body: tokens,
  };
};

export const handler = middy(baseHandler)
  .use(httpLambdaMiddleware())
  .use(validator({ eventSchema }));
