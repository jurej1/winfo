import { LimitOrderWithFee } from "@1inch/limit-order-sdk";
import middy from "@middy/core";
import httpJsonBodyParser from "@middy/http-json-body-parser";
import validator from "@middy/validator";
import { transpileSchema } from "@middy/validator/transpile";
import {
  httpLambdaMiddleware,
  submitOneInchLimitOrder,
} from "@w-info-sst/core";

import { ApiGwRequest } from "@w-info-sst/types";

const schema = {
  type: "object",
  required: ["body"],
  properties: {
    body: {
      type: "object",
      required: ["chainId", "signature"],
      properties: {
        chainId: {
          type: "number",
        },
        signature: {
          type: "string",
        },
      },
    },
  },
};

const eventSchema = transpileSchema(schema);

const baseHandler = async (
  event: ApiGwRequest<{
    body: {
      order: LimitOrderWithFee;
      chainId: number;
      signature: string;
    };
  }>,
) => {
  const { order, chainId, signature } = event.body;

  await submitOneInchLimitOrder(chainId, order, signature);

  return {
    statusCode: 200,
  };
};

export const handler = middy(baseHandler)
  .use(httpLambdaMiddleware())
  .use(httpJsonBodyParser())
  .use(validator({ eventSchema }));
