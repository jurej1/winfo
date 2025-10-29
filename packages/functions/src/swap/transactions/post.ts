import middy from "@middy/core";
import httpJsonBodyParser from "@middy/http-json-body-parser";
import validator from "@middy/validator";
import { transpileSchema } from "@middy/validator/transpile";
import { httpLambdaMiddleware } from "@w-info-sst/core";
import { addDexTransaction, InsertDexTransactionDB } from "@w-info-sst/db";
import { ApiGwRequest } from "@w-info-sst/types";

const schema = {
  type: "object",
  required: ["body"],
  properties: {
    body: {
      type: "object",
      required: ["transactionHash", "chainId"],
      properties: {
        chainId: { type: "number" },
        transactionHash: { type: "string" },
        blockHash: { type: "string" },
      },
    },
  },
};

const eventSchema = transpileSchema(schema);

const baseHandler = async (
  event: ApiGwRequest<{
    body: InsertDexTransactionDB;
  }>,
) => {
  const transaction = event.body;

  const response = await addDexTransaction(transaction);

  return {
    statusCode: 200,
    body: response,
  };
};

export const handler = middy(baseHandler)
  .use(httpLambdaMiddleware())
  .use(httpJsonBodyParser())
  .use(validator({ eventSchema }));
