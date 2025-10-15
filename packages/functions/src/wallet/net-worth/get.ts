import middy from "@middy/core";
import httpJsonBodyParser from "@middy/http-json-body-parser";
import { initMoralisMiddleware, MoralisRepository } from "@w-info-sst/core";
import { ApiGwRequest } from "@w-info-sst/types";

const baseHandler = async (
  event: ApiGwRequest<{
    pathParameters: {
      address: string;
    };
    body: {
      chains?: string[];
    };
  }>
) => {
  const { address } = event.pathParameters;

  const chains = event.body?.chains;

  const response = await MoralisRepository.getWalletNetWorth({
    address,
    chains: chains,
  });

  return {
    statusCode: 200,
    body: JSON.stringify(response),
  };
};

export const handler = middy(baseHandler).use([
  initMoralisMiddleware(),
  httpJsonBodyParser({ disableContentTypeError: true }),
]);
