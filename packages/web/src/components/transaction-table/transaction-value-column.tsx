import { WalletHistoryItem } from "../../../../types/src/moralis/wallet.type";
import { IoIosSend } from "react-icons/io";
import { MdCallReceived } from "react-icons/md";
import Image from "next/image";

type Props = {
  tx: WalletHistoryItem;
};
export function TranassctionValue({ tx }: Props) {
  const TokenRow = ({
    val,
    symbol,
    logo,
    direction,
  }: {
    val: string;
    symbol: string;
    logo: string | null;
    direction?: "receive" | "send";
  }) => {
    return (
      <div className="flex items-center gap-1 text-sm">
        {direction && direction === "receive" ? (
          <MdCallReceived />
        ) : (
          <IoIosSend />
        )}
        <span>{val}</span>
        <span>{symbol}</span>
        {logo && (
          <Image
            src={logo}
            alt="Token Logo"
            width={18}
            height={18}
            className="object-contain"
          />
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-1">
      {tx.erc20_transfers.map((tx) => (
        <TokenRow
          key={tx.direction}
          val={tx.value_formatted}
          symbol={tx.token_symbol}
          logo={tx.token_logo}
          direction={tx.direction}
        />
      ))}
      {tx.native_transfers.map((tx) => (
        <TokenRow
          key={tx.direction}
          val={tx.value_formatted}
          symbol={tx.token_symbol}
          logo={tx.token_logo}
          direction={tx.direction}
        />
      ))}
      {tx?.contract_interactions?.approvals?.map((tx, index) => (
        <TokenRow
          key={index}
          val={tx.value_formatted}
          symbol={tx.token.token_symbol}
          logo={null}
        />
      ))}
    </div>
  );
}
