export interface CoinGeckoTokenResponse {
  id: string;
  symbol: string;
  name: string;
  web_slug: string;
  asset_platform_id: string | null;
  categories: string[];
  description: {
    en: string;
  };
  links: {
    homepage: string[];
    blockchain_site: string[];
    twitter_screen_name: string;
    subreddit_url: string;
    repos_url: {
      github: string[];
    };
  };
  image: {
    thumb: string;
    small: string;
    large: string;
  };
  genesis_date: string | null;
  market_cap_rank: number;
  market_data: {
    current_price: {
      usd: number;
      btc: number;
      eth: number;
    };
    market_cap: {
      usd: number;
      btc: number;
      eth: number;
    };
    fully_diluted_valuation: {
      usd: number;
    };
    total_volume: {
      usd: number;
    };
    high_24h: {
      usd: number;
    };
    low_24h: {
      usd: number;
    };
    price_change_24h: number;
    price_change_percentage_24h: number;
    price_change_percentage_7d: number;
    price_change_percentage_14d: number;
    price_change_percentage_30d: number;
    price_change_percentage_60d: number;
    price_change_percentage_200d: number;
    price_change_percentage_1y: number;
    market_cap_change_24h: number;
    market_cap_change_percentage_24h: number;
    ath: {
      usd: number;
      btc: number;
      eth: number;
    };
    ath_change_percentage: {
      usd: number;
    };
    ath_date: {
      usd: string;
    };
    atl: {
      usd: number;
      btc: number;
      eth: number;
    };
    atl_change_percentage: {
      usd: number;
    };
    atl_date: {
      usd: string;
    };
    total_supply: number | null;
    max_supply: number | null;
    max_supply_infinite: boolean;
    circulating_supply: number;
    last_updated: string;
  };
  last_updated: string;
}
