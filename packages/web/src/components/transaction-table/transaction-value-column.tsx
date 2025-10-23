import { WalletHistoryItem } from "../../../../types/src/moralis/wallet.type";
import { IoIosSend } from "react-icons/io";
import { MdCallReceived } from "react-icons/md";
import Image from "next/image";

type Props = {
  tx: WalletHistoryItem;
};
export function TranassctionValue({ tx }: Props) {
  const { category } = tx;

  const nTx = tx.native_transfers[0];
  const ercTx = tx.erc20_transfers[0];

  const TokenRow = ({
    val,
    symbol,
    logo,
    direction,
  }: {
    val: string;
    symbol: string;
    logo: string | null;
    direction: "receive" | "send";
  }) => {
    return (
      <div className="flex items-center gap-1 text-sm">
        {direction === "receive" ? <MdCallReceived /> : <IoIosSend />}
        <span>{val}</span>
        <span>{symbol}</span>
        {logo && (
          <Image
            src={logo}
            alt="Token Logo"
            width={16}
            height={16}
            className="rounded-full border border-blue-500 object-contain"
          />
        )}
      </div>
    );
  };

  if (category === "token swap") {
    return (
      <div className="flex flex-col gap-1">
        <TokenRow
          logo={nTx.token_logo}
          symbol={nTx.token_symbol}
          val={nTx.value_formatted}
          direction={nTx.direction}
        />
        <TokenRow
          val={ercTx.value_formatted}
          symbol={ercTx.token_symbol}
          logo={ercTx.token_logo}
          direction={ercTx.direction}
        />
      </div>
    );
  }

  if (category === "send") {
    return (
      <TokenRow
        val={nTx.value_formatted}
        symbol={nTx.token_symbol}
        logo={nTx.token_logo}
        direction={nTx.direction}
      />
    );
  }

  if (category === "token receive") {
    return (
      <TokenRow
        val={ercTx.value_formatted}
        symbol={ercTx.token_symbol}
        logo={ercTx.token_logo}
        direction={ercTx.direction}
      />
    );
  }

  if (category === "approve") {
    return <div></div>;
  }

  if (category === "receive") {
    return (
      <TokenRow
        val={nTx.value_formatted}
        symbol={nTx.token_symbol}
        logo={nTx.token_logo}
        direction={nTx.direction}
      />
    );
  }
}
