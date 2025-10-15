import middy from "@middy/core";
import { initMoralisMiddleware, MoralisRepository } from "@w-info-sst/core";
import { ApiGwRequest } from "@w-info-sst/types";

const baseHandler = async (
  event: ApiGwRequest<{
    pathParameters: {
      address: string;
    };
  }>
) => {
  const { address } = event.pathParameters;

  const response = await MoralisRepository.getWalletTokenTransfers(address);

  return {
    statusCode: 200,
    body: JSON.stringify(response),
  };
};

export const handler = middy(baseHandler).use([initMoralisMiddleware()]);
