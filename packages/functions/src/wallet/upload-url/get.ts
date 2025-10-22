import middy from "@middy/core";
import {
  getPresignedUrlForWallet,
  httpLambdaMiddleware,
} from "@w-info-sst/core";
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

  const isValid = isAddress(address);

  if (!isValid) throw new Error("Invalid Wallet Address");

  const response = await getPresignedUrlForWallet(address);

  return {
    statusCode: 200,
    body: response,
  };
};

export const handler = middy(baseHandler).use(httpLambdaMiddleware());
