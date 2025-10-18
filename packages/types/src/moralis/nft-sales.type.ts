import { PaymentToken } from "./nft-transaction.type";

export interface SaleTransaction {
  transaction_hash: string;
  block_timestamp: string;
  buyer_address: string;
  seller_address: string;
  price: string;
  price_formatted: string;
  usd_price_at_sale: string;
  current_usd_value: string;
  token_id: string;
  payment_token: PaymentToken;
}

export interface AverageSale {
  price: string;
  price_formatted: string;
  current_usd_value: string;
}

export interface CollectionStats {
  last_sale: SaleTransaction;
  lowest_sale: SaleTransaction;
  highest_sale: SaleTransaction;
  average_sale: AverageSale;
  total_trades: number;
}
