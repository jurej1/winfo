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
      chain: string;
    };
  }>,
) => {
  const { address } = event.pathParameters;

  const chainId = event.queryStringParameters.chain;

  const chain = mapToChain(chainId);

  const response = await MoralisRepository.getTokenBalancesByWallet(
    address,
    chain,
  );

  return {
    statusCode: 200,
    body: response,
  };
};

export const handler = middy(baseHandler)
  .use(httpLambdaMiddleware())
  .use(initMoralisMiddleware());
