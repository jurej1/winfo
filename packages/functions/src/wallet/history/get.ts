import middy from "@middy/core";

import {
  httpLambdaMiddleware,
  initMoralisMiddleware,
  mapToChain,
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
      chain?: string;
    };
  }>,
) => {
  const { address } = event.pathParameters;

  const cursor = event.queryStringParameters?.cursor;
  const chainId = event.queryStringParameters?.chain;

  let chain = mapToChain(chainId);

  const response = await MoralisRepository.getWalletHistory(
    address,
    chain,
    cursor,
  );

  return {
    statusCode: 200,
    body: response,
  };
};

export const handler = middy(baseHandler)
  .use(httpLambdaMiddleware())
  .use([initMoralisMiddleware()]);
