import middy from "@middy/core";

import {
  httpLambdaMiddleware,
  initMoralisMiddleware,
  MoralisRepository,
} from "@w-info-sst/core";

import { ApiGwRequest } from "@w-info-sst/types";

const baseHandler = async (
  event: ApiGwRequest<{
    pathParameters: {
      address: string;
    };
    queryStringParameters: {
      cursor?: string;
    };
  }>,
) => {
  const { address } = event.pathParameters;

  const cursor = event.queryStringParameters?.cursor;

  const response = await MoralisRepository.getWalletHistory(address, cursor);

  return {
    statusCode: 200,
    body: response,
  };
};

export const handler = middy(baseHandler)
  .use(httpLambdaMiddleware())
  .use([initMoralisMiddleware()]);
