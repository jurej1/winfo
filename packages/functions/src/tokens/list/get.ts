import middy from "@middy/core";
import { CoingeckoRepository, httpLambdaMiddleware } from "@w-info-sst/core";
import { ApiGwRequest } from "@w-info-sst/types";

const baseHandler = async (
  event: ApiGwRequest<{ queryStringParameters: { page: string } }>,
) => {
  const page = event.queryStringParameters.page;

  const response = await CoingeckoRepository.getCoinListWithMarketData({
    page,
  });

  return {
    statusCode: 200,
    body: response,
  };
};

export const handler = middy(baseHandler).use(httpLambdaMiddleware());
