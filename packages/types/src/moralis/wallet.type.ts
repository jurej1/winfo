type Address = `0x${string}`;

export interface ChainNetWorth {
  chain: string;
  native_balance: string;
  native_balance_formatted: string;
  native_balance_usd: string;
  token_balance_usd: string;
  networth_usd: string;
}

export interface GetWalletNetWorthResponse {
  total_networth_usd: string;
  chains: ChainNetWorth[];
}

export interface WalletHistoryResponse {
  cursor: string | null;
  page_size: number;
  limit: string;
  result: WalletHistoryItem[];
  page: number;
}

export interface WalletHistoryItem {
  hash: string;
  nonce: string;
  transaction_index: string;
  from_address_entity: any;
  from_address_entity_logo: any;
  from_address: string;
  from_address_label: any;
  to_address_entity: any;
  to_address_entity_logo: string | null;
  to_address: string;
  to_address_label: string | null;
  value: string;
  gas: string;
  gas_price: string;
  receipt_cumulative_gas_used: string;
  receipt_gas_used: string;
  receipt_contract_address: any;
  receipt_status: string;
  block_timestamp: string;
  block_number: string;
  block_hash: string;
  transaction_fee: string;
  method_label: string | null;
  nft_transfers: any[];
  erc20_transfers: ERC20Transfer[];
  native_transfers: NativeTransfer[];
  contract_interactions: ContractInteractions | undefined;
  summary: string;
  possible_spam: boolean;
  category:
    | "token swap"
    | "approve"
    | "send"
    | "token receive"
    | "receive"
    | "deposit"
    | "contract interaction";
}

export interface ERC20Transfer {
  token_name: string;
  token_symbol: string;
  token_logo: string | null;
  token_decimals: string;
  from_address_entity: any;
  from_address_entity_logo: any;
  from_address: string;
  from_address_label: any;
  to_address_entity: any;
  to_address_entity_logo: any;
  to_address: string;
  to_address_label: any;
  address: string;
  log_index: number;
  value: string;
  possible_spam: boolean;
  verified_contract: boolean;
  security_score: number | null;
  direction: "receive" | "send";
  value_formatted: string;
}

export interface NativeTransfer {
  from_address_entity: any;
  from_address_entity_logo: any;
  from_address: string;
  from_address_label: any;
  to_address_entity: any;
  to_address_entity_logo: string;
  to_address: string;
  to_address_label: string;
  value: string;
  value_formatted: string;
  direction: "receive" | "send";
  internal_transaction: boolean;
  token_symbol: string;
  token_logo: string | null;
}

export interface ContractInteractions {
  approvals: Approval[];
}

export interface Approval {
  value: string;
  value_formatted: string;
  token: Token;
  spender: Spender;
}

export interface Token {
  address: string;
  address_label: string;
  token_name: string;
  token_logo: string;
  token_symbol: string;
}

export interface TokenApproval {
  address: Address;
  address_label: string;
  name: string;
  symbol: string;
  logo: string | null;
  possible_spam: boolean;
  verified_contract: boolean;
  current_balance: string;
  current_balance_formatted: string;
  usd_price: string;
  usd_at_risk: string | null;
}

export interface Spender {
  address: Address;
  address_label?: string;
  entity?: string;
  entity_logo?: string;
}

export interface ApprovalResult {
  block_number: string;
  block_timestamp: string;
  transaction_hash: string;
  value: string;
  value_formatted: string;
  token: TokenApproval;
  spender: Spender;
}

export interface WalletApprovalsResponse {
  limit: number;
  page_size: number;
  cursor: string | null;
  result: ApprovalResult[];
}
