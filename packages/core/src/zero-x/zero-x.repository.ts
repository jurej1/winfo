import {
  GetPrice0XParams,
  GetPrice0XResponse,
  GetQuote0XParams,
  GetQuote0XResponse,
} from "@w-info-sst/types";
import { Resource } from "sst";

export class ZeroXRepository {
  private static baseUrl = "https://api.0x.org/swap/permit2";

  private static headers = {
    "0x-api-key": Resource.ZeroXApiKey.value,
    "0x-version": "v2",
  };

  static async getPrice(params: GetPrice0XParams) {
    const searchParams = new URLSearchParams({
      chainId: params.chainId.toString(),
      buyToken: params.buyToken,
      sellToken: params.sellToken,
      sellAmount: params.sellAmount,
      taker: params.taker,
    });

    const url = `${this.baseUrl}/price?${searchParams}`;

    const response = await fetch(url, {
      headers: this.headers,
    });

    const body = await response.json();

    return body as GetPrice0XResponse;
  }

  static async getQuote(params: GetQuote0XParams) {
    const searchParams = new URLSearchParams({
      chainId: params.chainId.toString(),
      buyToken: params.buyToken,
      sellToken: params.sellToken,
      sellAmount: params.sellAmount,
      taker: params.taker,
    });

    const url = `${this.baseUrl}/quote?${searchParams}`;

    const response = await fetch(url, {
      headers: this.headers,
    });

    const body = await response.json();

    return body as GetQuote0XResponse;
  }
}
