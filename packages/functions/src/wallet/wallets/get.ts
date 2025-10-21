import middy from "@middy/core";
import { httpLambdaMiddleware } from "@w-info-sst/core";
import { getWallets } from "@w-info-sst/db";
import { ApiGwRequest } from "@w-info-sst/types";

const baseHandler = async (event: ApiGwRequest) => {
  const wallets = await getWallets();

  return {
    statusCode: 200,
    body: wallets,
  };
};

export const handler = middy(baseHandler).use(httpLambdaMiddleware());
