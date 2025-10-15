import middy from "@middy/core";
import Moralis from "moralis";
import { Resource } from "sst";

export const initMoralisMiddleware = (): middy.MiddlewareObj => {
  const before: middy.MiddlewareFn = async () => {
    if (!Moralis.Core.isStarted) {
      console.log("[Moralis] started initialization...");

      await Moralis.start({
        apiKey: Resource.MoralisAPIKey.value,
      });

      console.log("[Moralis] initialized successfully!");
    }
  };
  return {
    before,
  };
};
