import { Api, FetchProviderConnector } from "@1inch/limit-order-sdk";
import { Resource } from "sst";

export const limitOrderApi = (chainId: number) =>
  new Api({
    authKey: Resource.OneInchAPIKey.value,
    networkId: chainId,
    httpConnector: new FetchProviderConnector(),
  });
