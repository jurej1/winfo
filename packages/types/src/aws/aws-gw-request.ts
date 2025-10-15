import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from "aws-lambda";

export type ApiGwRequest<
  T extends {
    body?: unknown;
    queryStringParameters?: unknown;
    pathParameters?: unknown;
    extras?: Record<string, unknown>;
  } = {}
> = Omit<
  APIGatewayProxyEventV2,
  "body" | "queryStringParameters" | "pathParameters"
> & {
  body: T["body"];
  queryStringParameters: T["queryStringParameters"];
  pathParameters: T["pathParameters"];
  extras: T["extras"];
};

export type ApiGwResponse = Omit<APIGatewayProxyResultV2, "body"> & {
  body?: Record<string, any> | Array<Record<string, any>>;
};
