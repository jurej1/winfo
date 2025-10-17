// The full object matching the structure of the JSON response
export type FullNftData = {
  token_address: string;
  token_id: string;
  amount: string;
  token_hash: string;
  block_number: string;
  block_number_minted: string | null;
  contract_type: string;
  name: string;
  symbol: string;
  token_uri: string;
  metadata: string;
  last_token_uri_sync: string;
  last_metadata_sync: string;
  minter_address: string | null;
  owner_of: string;
  rarity_rank: number;
  rarity_percentage: number;
  rarity_label: string;
  possible_spam: boolean;
  verified_collection: boolean;
  list_price: {
    listed: boolean;
    price: string | null;
    price_currency: string | null;
    price_usd: string | null;
    marketplace: string | null;
  };
  collection_logo: string | null;
  collection_banner_image: string | null;
  collection_category: string | null;
  project_url: string | null;
  wiki_url: string | null;
  discord_url: string | null;
  telegram_url: string | null;
  twitter_username: string | null;
  instagram_username: string | null;
  floor_price: string;
  floor_price_usd: string;
  floor_price_currency: string;
};

export interface Attribute {
  trait_type: string;
  value: string;
}

export interface NftMetadata {
  attributes: Attribute[];
  description: string;
  image: string;
  name: string;
}
export type GetContractNftsResponseObject = {
  cursor: string;
  page: number;
  page_size: number;
  result: FullNftData[];
};
