import { NftTransactionRecord } from "@w-info-sst/types";

type Props = {
  nft: NftTransactionRecord;
};
export function NftTransactionCard({ nft }: Props) {
  const { transaction_hash, block_timestamp, token_id, last_sale } = nft;

  const { price_formatted } = last_sale;

  return (
    <li className="flex justify-between rounded-sm border bg-white p-2 text-xs">
      <h6>{transaction_hash.substring(0, 8)}...</h6>
      <h6>Price: {price_formatted}</h6>
      <h6>Token: {token_id}</h6>
      <h6>{new Date(block_timestamp).toLocaleDateString()}</h6>
    </li>
  );
}
