export interface NftTransaction {
  block_number: string;
  block_timestamp: string;
  block_hash: string;
  transaction_hash: string;
  transaction_index: number;
  log_index: number;
  value: string;
  contract_type: "ERC721" | "ERC1155";
  transaction_type: string;
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
}

export interface NftTransactionResponse {
  page: number;
  page_size: number;
  cursor: string;
  result: NftTransaction[];
  block_exists: boolean;
}
