import { TokenUniswap } from "@w-info-sst/types";

export class UniswapRepository {
  static async getTokens() {
    const url = "https://tokens.uniswap.org/";

    const response = await fetch(url);

    const body = (await response.json()) as { tokens: {} };

    return body["tokens"] as TokenUniswap[];
  }
}
