import middy from "@middy/core";
import { CoingeckoRepository, httpLambdaMiddleware } from "@w-info-sst/core";
import { ApiGwRequest } from "@w-info-sst/types";

const baseHandler = async (
  event: ApiGwRequest<{
    pathParameters: {
      id: string;
    };
  }>,
) => {
  const id = event.pathParameters.id;

  const response = await CoingeckoRepository.getCoinData(id);

  return {
    statusCode: 200,
    body: response,
  };
};

export const handler = middy().use(httpLambdaMiddleware());
