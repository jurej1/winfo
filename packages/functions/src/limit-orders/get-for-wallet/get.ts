import middy from "@middy/core";
import validator from "@middy/validator";
import { transpileSchema } from "@middy/validator/transpile";
import {
  getLimitOrdersForWallet,
  httpLambdaMiddleware,
} from "@w-info-sst/core";
import { ApiGwRequest } from "@w-info-sst/types";
import { isAddress } from "validate-ethereum-address";

const schema = {
  type: "object",
  required: ["queryStringParameters"],
  properties: {
    queryStringParameters: {
      type: "object",
      required: ["chainId", "wallet"],
      properties: {
        chainId: {
          type: "number",
        },
        wallet: {
          type: "string",
        },
      },
    },
  },
};

const eventSchema = transpileSchema(schema);

const baseHandler = async (
  event: ApiGwRequest<{
    queryStringParameters: {
      chainId: number;
      wallet: string;
    };
  }>,
) => {
  const { wallet, chainId } = event.queryStringParameters;

  if (!isAddress(wallet)) {
    throw new Error("Invalid wallet address");
  }

  const response = await getLimitOrdersForWallet(chainId, wallet);

  return {
    statusCode: 200,
    body: response,
  };
};

export const handler = middy(baseHandler)
  .use(httpLambdaMiddleware())
  .use(validator({ eventSchema }));
