import middy from "@middy/core";
import httpJsonBodyParser from "@middy/http-json-body-parser";
import validator from "@middy/validator";
import { transpileSchema } from "@middy/validator/transpile";
import {
  createOneInchLimitOrder,
  httpLambdaMiddleware,
} from "@w-info-sst/core";
import { ApiGwRequest, CreateOneInchOrderParams } from "@w-info-sst/types";

const schema = {
  type: "object",
  required: ["body"],
  properties: {
    body: {
      type: "object",
      required: [
        "chainId",
        "expiration",
        "maker",
        "makerAsset",
        "takerAsset",
        "makingAmount",
        "takingAmount",
      ],
      properties: {
        chainId: {
          type: "number",
        },
        expiration: {
          type: "number",
        },
        maker: {
          type: "string",
        },
        makerAsset: {
          type: "string",
        },
        takerAsset: {
          type: "string",
        },
        makingAmount: {
          type: "string",
        },
        takingAmount: {
          type: "string",
        },
      },
    },
  },
};

const eventSchema = transpileSchema(schema);

const baseHandler = async (
  event: ApiGwRequest<{
    body: CreateOneInchOrderParams;
  }>,
) => {
  const params = event.body;

  const { chainId } = params;

  const order = await createOneInchLimitOrder(params);

  const typedData = order.getTypedData(chainId);

  const orderHash = order.getOrderHash(chainId);

  // Serialize order to plain object structures that can be JSON stringified
  // The order data structure and extension can be used to reconstruct the order
  const orderData = order.build(); // Returns LimitOrderV4Struct (serializable)
  const extension = order.feeExtension.build(); // Returns Extension (serializable)

  return {
    statusCode: 200,
    body: {
      orderData, // LimitOrderV4Struct - can be reconstructed
      extension, // Extension - can be reconstructed
      typedData,
      orderHash,
    },
  };
};

export const handler = middy(baseHandler)
  .use(httpLambdaMiddleware())
  .use(httpJsonBodyParser())
  .use(validator({ eventSchema }));
