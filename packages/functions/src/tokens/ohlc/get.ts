import middy from "@middy/core";
import { CoingeckoRepository } from "@w-info-sst/core";
import { ApiGwRequest, OHLCDaysFilter } from "@w-info-sst/types";

const baseHandler = async (
  event: ApiGwRequest<{
    queryStringParameters: {
      coin: string;
      days: OHLCDaysFilter;
    };
  }>,
) => {
  const { coin, days } = event.queryStringParameters;

  const response = await CoingeckoRepository.getOhlc({
    coinId: coin,
    days,
  });

  return {
    statusCode: 200,
    body: JSON.stringify(response),
  };
};

export const handler = middy(baseHandler);
