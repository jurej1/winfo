import { Input } from "../ui/input";
import { useAccount, useBalance } from "wagmi";
import { formatCurrency } from "@coingecko/cryptoformat";

import { DexSelectToken } from "./dex-select-token";
import { TokenDB } from "@w-info-sst/db";
import { useFormattedBigNumber } from "@/util/formatter/useFormattedBigNumber";
import { NumberType } from "@/util/formatter/types";

type Props = {
  title: string;
  token?: TokenDB;
  onValChanged: (val: string) => void;
  onSetToken: (token: TokenDB) => void;
  value: string;
  readonly?: boolean;
  isNumberInput?: boolean;
};

export function DexCardInput({
  title,
  token,
  onValChanged,
  value,
  onSetToken,
  readonly,
  isNumberInput = false,
}: Props) {
  const { chainId, address } = useAccount();

  const tokenAddress = token?.native ? undefined : token?.address;

  const { data: balance } = useBalance({
    chainId: chainId,
    address: address,
    token: tokenAddress,
    query: {
      refetchInterval: 1000 * 10, // 10sec
    },
  });

  const formattedValue = useFormattedBigNumber({
    decimals: balance?.decimals,
    value: balance?.value,
    type: NumberType.TokenTx,
  });

  return (
    <div className="flex flex-col gap-2 rounded-2xl bg-blue-200/20 p-4">
      <p className="text-md text-gray-400">{title}</p>

      <div className="flex items-center gap-4">
        <Input
          key={token?.address}
          type={isNumberInput ? "number" : undefined}
          className="border-none text-black shadow-none focus-visible:border-none focus-visible:ring-0"
          placeholder="0.0"
          value={value}
          style={{
            fontSize: 28,
          }}
          onChange={(event) => {
            const val = event.target.value;
            onValChanged(val);
          }}
          readOnly={readonly}
        />
        <DexSelectToken token={token} onSetToken={onSetToken} />
      </div>
      <div className="flex items-center justify-between">
        <span></span>
        <span>
          {token && formattedValue} {token && balance?.symbol}
        </span>
      </div>
    </div>
  );
}
