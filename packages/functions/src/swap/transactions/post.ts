import middy from "@middy/core";
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

  console.log("transaction", transaction);

  const response = await addDexTransaction({
    transactionHash: transaction.transactionHash,
    chainId: transaction.chainId,
  });

  return {
    statusCode: 200,
    body: response,
  };
};

export const handler = middy(baseHandler).use(httpLambdaMiddleware());
