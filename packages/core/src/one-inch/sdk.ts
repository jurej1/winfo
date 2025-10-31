import { FetchProviderConnector, Sdk } from "@1inch/limit-order-sdk";
import { Resource } from "sst";

export const oneInchSdk = (chainId: number) =>
  new Sdk({
    authKey: Resource.OneInchAPIKey.value,
    networkId: chainId,
    httpConnector: new FetchProviderConnector(),
  });
