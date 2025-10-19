import middy from "@middy/core";
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
  }>,
) => {
  const { address } = event.pathParameters;

  const chains = event.body?.chains;

  const response = await MoralisRepository.getWalletNetWorth({
    address,
    chains: chains,
  });

  console.log("RESPONSE", response);

  return {
    statusCode: 200,
    body: JSON.stringify(response),
    headers: {
      "Content-Type": "application/json",
    },
  };
};

export const handler = middy(baseHandler).use([initMoralisMiddleware()]);
