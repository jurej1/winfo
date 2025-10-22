import middy from "@middy/core";
import { httpLambdaMiddleware } from "@w-info-sst/core";
import { getNetWorthsForSpecificWallet } from "@w-info-sst/db";
import { ApiGwRequest } from "@w-info-sst/types";
import { isAddress } from "validate-ethereum-address";

const baseHandler = async (
  event: ApiGwRequest<{
    pathParameters: {
      address: string;
    };
  }>,
) => {
  const { address } = event.pathParameters;

  const validAddress = isAddress(address);

  if (!validAddress) {
    throw new Error("Invalid Wallet Address");
  }

  const response = await getNetWorthsForSpecificWallet(address);

  return {
    statusCode: 200,
    body: response,
  };
};

export const handler = middy(baseHandler).use(httpLambdaMiddleware());
