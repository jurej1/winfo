import middy from "@middy/core";
import { CoingeckoRepository, httpLambdaMiddleware } from "@w-info-sst/core";
import { ApiGwRequest } from "@w-info-sst/types";

const baseHandler = async (
  event: ApiGwRequest<{ queryStringParameters: { coin: string } }>,
) => {
  const coin = event.queryStringParameters.coin;

  const response = await CoingeckoRepository.getCoinListWithMarketData({
    page: "1",
    ids: coin,
  });

  return {
    statusCode: 200,
    body: response,
  };
};

export const handler = middy(baseHandler).use(httpLambdaMiddleware());
