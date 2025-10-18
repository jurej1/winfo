import middy from "@middy/core";
import httpJsonBodyParser from "@middy/http-json-body-parser";
import { initMoralisMiddleware, MoralisRepository } from "@w-info-sst/core";
import { ApiGwRequest } from "@w-info-sst/types";

const baseHandler = async (
  event: ApiGwRequest<{
    queryStringParameters: {
      address?: string;
    };
  }>,
) => {
  const address = event.queryStringParameters?.address;

  if (!address) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Sorry there was an error" }),
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  // max is 90 days
  const durationDays = [1, 7, 30, 90];

  const response = await Promise.all(
    durationDays.map((days) =>
      MoralisRepository.getNFTContractSalePrices({ address, days }),
    ),
  );

  console.log("response", response.length);

  return {
    statusCode: 200,
    body: JSON.stringify(response),
    headers: {
      "Content-Type": "application/json",
    },
  };
};

export const handler = middy(baseHandler).use([
  initMoralisMiddleware(),
  httpJsonBodyParser({
    disableContentTypeError: true,
  }),
]);
