import {
  Extension,
  LimitOrderV4Struct,
  LimitOrderWithFee,
} from "@1inch/limit-order-sdk";
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
      required: ["chainId", "signature", "orderData", "extension"],
      properties: {
        chainId: {
          type: "number",
        },
        signature: {
          type: "string",
        },
        orderData: {
          type: "object",
        },
        extension: {
          type: "object",
        },
      },
    },
  },
};

const eventSchema = transpileSchema(schema);

const baseHandler = async (
  event: ApiGwRequest<{
    body: {
      orderData: LimitOrderV4Struct;
      extension: Extension;
      chainId: number;
      signature: string;
    };
  }>,
) => {
  const { orderData, extension, chainId, signature } = event.body;

  const order = LimitOrderWithFee.fromDataAndExtension(orderData, extension);

  await submitOneInchLimitOrder(chainId, order, signature);

  return {
    statusCode: 200,
  };
};

export const handler = middy(baseHandler)
  .use(httpLambdaMiddleware())
  .use(httpJsonBodyParser())
  .use(validator({ eventSchema }));
