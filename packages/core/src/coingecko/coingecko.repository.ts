import { TokenListInfo } from "@w-info-sst/types";
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
      },
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
      },
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

  static async getCoinPriceById(id: string) {
    const queryParams = new URLSearchParams({
      vs_currencies: "usd,eth",
      ids: id,
      include_market_cap: "true",
      include_24hr_vol: "true",
      include_24hr_change: "true",
      include_last_updated_at: "true",
    }).toString();

    const url = `${this.API_URL}/simple/price?${queryParams}`;

    const response = await fetch(url, {
      headers: this.headers,
    });

    const body = await response.json();

    return body;
  }

  static async getCoinListWithMarketData() {
    const searchParams = new URLSearchParams({
      vs_currency: "usd",
      category: "layer-1",
      price_change_percentage: "1h",
      per_page: "10",
    }).toString();

    const url = `${this.API_URL}/coins/markets?${searchParams}`;

    const response = await fetch(url, {
      headers: this.headers,
    });

    const data = await response.json();

    return data as TokenListInfo[];
  }
}
