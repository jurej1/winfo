import {
  CoingeckoPriceResponse,
  CoinGeckoTokenResponse,
  OHLCDaysFilter,
  TokenListInfo,
} from "@w-info-sst/types";
import { Resource } from "sst";

export class CoingeckoRepository {
  private static API_URL = "https://api.coingecko.com/api/v3";

  private static headers = {
    "x-cg-demo-api-key": Resource.CoinGeckoAPIKey.value,
  };

  static async getOhlc({
    coinId,
    days = "1",
  }: {
    coinId: string;
    days?: OHLCDaysFilter;
  }) {
    const searchParams = new URLSearchParams({
      vs_currency: "usd",
      days: days,
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

  static async getCoinData(id: string) {
    const url = `${this.API_URL}/coins/${id}`;

    const response = await fetch(url, {
      headers: this.headers,
    });

    const body = await response.json();

    return body as CoinGeckoTokenResponse;
  }

  static async getAllCoins() {
    const url = `${this.API_URL}/coins/list`;

    const response = await fetch(url, {
      headers: this.headers,
    });

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
      vs_currencies: "usd",
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

    return body as CoingeckoPriceResponse;
  }

  static async getCoinListWithMarketData({
    page,
    ids,
  }: {
    page: string;
    ids?: string;
  }) {
    const searchParams = new URLSearchParams({
      vs_currency: "usd",
      category: "layer-1",
      price_change_percentage: "1h",
      per_page: "20",
      page,
    });

    if (ids) {
      searchParams.set("ids", ids);
      searchParams.set("per_page", "1");
    }

    const url = `${this.API_URL}/coins/markets?${searchParams.toString()}`;

    const response = await fetch(url, {
      headers: this.headers,
    });

    const data = await response.json();

    return data as TokenListInfo[];
  }

  static async getTickersByCoinId(id: string) {
    const searchParams = new URLSearchParams({
      exchange_ids: "binance",
    }).toString();

    const url = `${this.API_URL}/coins/${id}/tickers?${searchParams}`;

    const response = await fetch(url, { headers: this.headers });

    const data = await response.json();

    return data;
  }

  static async getCoinPriceDexByAddresses(
    network: string,
    addresses: string[],
  ) {
    const pathTokens = addresses.join(",");

    const url = `${this.API_URL}/onchain/networks/${network}/tokens/multi/${pathTokens}`;

    const response = await fetch(url, { headers: this.headers });

    const body = (await response.json()) as {
      data: {
        attributes: {
          price_usd: number;
        };
      }[];
    };

    return body.data.map((t) => t.attributes.price_usd);
  }
}
