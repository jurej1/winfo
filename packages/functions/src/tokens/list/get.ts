import middy from "@middy/core";
import httpJsonBodyParser from "@middy/http-json-body-parser";
import httpResponseSerializer from "@middy/http-response-serializer";
import { CoingeckoRepository } from "@w-info-sst/core";
import { ApiGwRequest } from "@w-info-sst/types";

const baseHandler = async (event: ApiGwRequest) => {
  const response = await CoingeckoRepository.getCoinListWithMarketData();

  return {
    statusCode: 200,
    body: response,
  };
};

export const handler = middy(baseHandler).use([
  httpJsonBodyParser({ disableContentTypeError: true }),
  httpResponseSerializer({
    serializers: [
      {
        regex: /^application\/json$/,
        serializer: ({ body }) => JSON.stringify(body),
      },
    ],
    defaultContentType: "application/json",
  }),
]);
