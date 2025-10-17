import middy from "@middy/core";
import { initMoralisMiddleware, MoralisRepository } from "@w-info-sst/core";
import { ApiGwRequest } from "@w-info-sst/types";

const baseHandler = async (
  event: ApiGwRequest<{
    queryStringParameters: {
      address: string;
    };
  }>,
) => {
  const { address } = event.queryStringParameters;

  console.log("Address", address);

  const response = await MoralisRepository.getNftContractTransfers(address);

  console.log("response", response);

  return {
    statusCode: 200,
    body: JSON.stringify(response),
    Headers: {
      "Content-Type": "application/json",
    },
  };
};

export const handler = middy(baseHandler).use([initMoralisMiddleware()]);
