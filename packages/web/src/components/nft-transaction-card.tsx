import { NftTransactionRecord } from "@w-info-sst/types";

type Props = {
  nft: NftTransactionRecord;
};
export function NftTransactionCard({ nft }: Props) {
  const { transaction_hash } = nft;

  return (
    <li className="rounded-sm border bg-white p-2">
      <h6 className="text-xs">{transaction_hash.substring(0, 8)}...</h6>
    </li>
  );
}
