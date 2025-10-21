import httpContentEncoding from "@middy/http-content-encoding";
import httpCors from "@middy/http-cors";
import httpErrorHandler from "@middy/http-error-handler";
import httpResponseSerializer from "@middy/http-response-serializer";

export const httpLambdaMiddleware = () => [
  httpCors(),
  httpErrorHandler({
    fallbackMessage: "Sorry there was an error",
  }),
  // client - server: gzip, compress, deflate ... saves bandwith, faster loading
  httpContentEncoding(),
  // automatically ads "Content-Type" header & then serializer function is ran
  httpResponseSerializer({
    serializers: [
      {
        regex: /^application\/json$/,
        serializer: ({ body }) => JSON.stringify(body),
      },
    ],
    defaultContentType: "application/json",
  }),
];
