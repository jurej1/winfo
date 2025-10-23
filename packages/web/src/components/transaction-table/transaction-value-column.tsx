import { WalletHistoryItem } from "../../../../types/src/moralis/wallet.type";
import { TransactionValueItem } from "./transaction-value-item";

type Props = {
  tx: WalletHistoryItem;
};
export function TranassctionValue({ tx }: Props) {
  return (
    <div className="flex flex-col gap-1">
      {tx.erc20_transfers.map((tx) => (
        <TransactionValueItem
          key={tx.direction}
          val={tx.value_formatted}
          symbol={tx.token_symbol}
          logo={tx.token_logo}
          direction={tx.direction}
        />
      ))}
      {tx.native_transfers.map((tx) => (
        <TransactionValueItem
          key={tx.direction}
          val={tx.value_formatted}
          symbol={tx.token_symbol}
          logo={tx.token_logo}
          direction={tx.direction}
        />
      ))}
      {tx?.contract_interactions?.approvals?.map((tx, index) => (
        <TransactionValueItem
          key={index}
          val={tx.value_formatted}
          symbol={tx.token.token_symbol}
          logo={null}
        />
      ))}
    </div>
  );
}
