import middy from "@middy/core";
import httpJsonBodyParser from "@middy/http-json-body-parser";
import validator from "@middy/validator";
import { transpileSchema } from "@middy/validator/transpile";
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
  console.log("Event", event);

  const { address } = event.body;

  console.log("address", address);

  const isValidAddress = isAddress(address);

  if (!isValidAddress) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Invalid Wallet Address" }),
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  const response = await addWallet(address);

  return {
    statusCode: 200,
    body: JSON.stringify(response),
    headers: {
      "Content-Type": "application/json",
    },
  };
};

export const handler = middy(baseHandler).use([
  httpJsonBodyParser({ disableContentTypeError: true }),
  validator({ eventSchema }),
]);
