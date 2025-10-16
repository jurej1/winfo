import middy from "@middy/core";
import { CoingeckoRepository } from "@w-info-sst/core";
import { ApiGwRequest } from "@w-info-sst/types";

const baseHandler = async (
  event: ApiGwRequest<{
    queryStringParameters: {
      query: string;
    };
  }>
) => {
  const { query } = event.queryStringParameters;

  const response = await CoingeckoRepository.searchCoin(query);

  return {
    statusCode: 200,
    body: JSON.stringify(response),
  };
};

export const handler = middy(baseHandler);
