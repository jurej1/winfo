import { Resource } from "sst";

export class CoingeckoRepository {
  private static API_URL = "https://api.coingecko.com/api/v3";

  private static headers = {
    "x-cg-demo-api-key": Resource.CoinGeckoAPIKey.value,
  };

  static async getOhlc({ coinId }: { coinId: string }) {
    const searchParams = new URLSearchParams({
      vs_currency: "usd",
      days: "1",
    }).toString();

    const response = await fetch(
      `${this.API_URL}/coins/${coinId}/ohlc?${searchParams}`,
      {
        headers: this.headers,
      }
    );

    const body = await response.json();

    return body;
  }

  static async getMarketChart(coinId: string) {
    const searchParams = new URLSearchParams({
      vs_currency: "usd",
      days: "1",
    }).toString();

    const response = await fetch(
      `${this.API_URL}/coins/${coinId}/market_chart?${searchParams}`,
      {
        headers: this.headers,
      }
    );

    const body = await response.json();

    return body;
  }

  static async searchCoin(query: string) {
    const searchParams = new URLSearchParams({ query }).toString();

    const response = await fetch(`${this.API_URL}/search?${searchParams}`);

    const body = (await response.json()) as {
      coins: [];
    };

    return body.coins;
  }
}
