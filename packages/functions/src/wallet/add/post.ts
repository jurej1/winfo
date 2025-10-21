import middy from "@middy/core";
import httpJsonBodyParser from "@middy/http-json-body-parser";
import validator from "@middy/validator";
import { transpileSchema } from "@middy/validator/transpile";
import { httpLambdaMiddleware } from "@w-info-sst/core";
import { addWallet } from "@w-info-sst/db";
import { ApiGwRequest } from "@w-info-sst/types";
import { isAddress } from "validate-ethereum-address";

const schema = {
  type: "object",
  required: ["body"],
  properties: {
    body: {
      type: "object",
      required: ["address"],
      properties: {
        address: {
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
      address: string;
    };
  }>,
) => {
  const { address } = event.body;

  const isValidAddress = isAddress(address);

  if (!isValidAddress) {
    throw new Error("Invalid Wallet Address");
  }

  const response = await addWallet(address);

  return {
    statusCode: 200,
    body: response[0],
  };
};

export const handler = middy(baseHandler)
  .use(httpLambdaMiddleware())
  .use([httpJsonBodyParser(), validator({ eventSchema })]);
