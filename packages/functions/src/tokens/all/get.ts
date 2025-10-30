import middy from "@middy/core";
import { CoingeckoRepository, httpLambdaMiddleware } from "@w-info-sst/core";

const baseHandler = async () => {
  const response = await CoingeckoRepository.getAllCoins();

  return {
    statusCode: 200,
    body: response,
  };
};

export const handler = middy(baseHandler).use(httpLambdaMiddleware());
