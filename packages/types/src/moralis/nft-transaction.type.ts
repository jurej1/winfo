export interface PaymentToken {
  token_name: string;
  token_symbol: string;
  token_logo: string;
  token_decimals: string;
  token_address: string;
}

export interface LastSale {
  transaction_hash: string;
  block_timestamp: string;
  buyer_address: string;
  seller_address: string;
  price: string;
  price_formatted: string;
  usd_price_at_sale: string;
  current_usd_value: string;
  token_address: string;
  token_id: string;
  payment_token: PaymentToken;
}

export interface NftTransactionRecord {
  block_number: string;
  block_timestamp: string;
  block_hash: string;
  transaction_hash: string;
  transaction_index: number;
  log_index: number;
  value: string;
  contract_type: "ERC721" | "ERC1155";
  transaction_type: "Single" | string;
  token_address: string;
  token_id: string;
  from_address_entity: string | null;
  from_address_entity_logo: string | null;
  from_address: string;
  from_address_label: string | null;
  to_address_entity: string | null;
  to_address_entity_logo: string | null;
  to_address: string;
  to_address_label: string | null;
  amount: string;
  verified: number;
  operator: string | null;
  possible_spam: boolean;
  verified_collection: boolean;
  last_sale: LastSale;
}

export interface NftTransactions {
  page: number;
  page_size: number;
  cursor: string;
  result: NftTransactionRecord[];
  block_exists: boolean;
}
