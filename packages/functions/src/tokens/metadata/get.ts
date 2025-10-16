import middy from "@middy/core";
import { initMoralisMiddleware, MoralisRepository } from "@w-info-sst/core";
import { ApiGwRequest } from "@w-info-sst/types";

const baseHandler = async (
  event: ApiGwRequest<{
    queryStringParameters: {
      symbol?: string;
      address?: string;
    };
  }>,
) => {
  const symbol = event.queryStringParameters.symbol;
  const address = event.queryStringParameters.address;

  if (!symbol && !address) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "Missing required query parameter: symbol od address.",
      }),
    };
  }

  if (symbol && address) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "Both Query parameters address and symbol can not be defined.",
      }),
    };
  }

  if (symbol && !address) {
    const response = await MoralisRepository.getCoinMetadataBySymbol(symbol);

    return {
      statusCode: 200,
      body: JSON.stringify(response),
    };
  }

  if (address && !symbol) {
    const response = await MoralisRepository.getCoinMetadataByAddress(address);

    return {
      statusCode: 200,
      body: JSON.stringify(response),
    };
  }

  return {
    statusCode: 400,
  };
};

export const handler = middy(baseHandler).use([initMoralisMiddleware()]);
