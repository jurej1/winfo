import { Input } from "../ui/input";
import { useAccount, useBalance } from "wagmi";

import { DexSelectToken } from "./dex-select-token";
import { TokenDBwithPrice } from "@w-info-sst/db";
import { useFormattedBigNumber } from "@/util/formatter/useFormattedBigNumber";
import { NumberType } from "@/util/formatter/types";
import { useMemo } from "react";

type Props = {
  title: string;
  token?: TokenDBwithPrice;
  onValChanged: (val: string) => void;
  onSetToken: (token: TokenDBwithPrice) => void;
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

  const usdPrice = useMemo(() => {
    if (!token?.priceUsd || !value) return "0.00";

    const valNumber = Number(value);
    const tokenPrice = Number(token.priceUsd);

    if (isNaN(valNumber) || isNaN(tokenPrice)) return "0.00";

    const totalUsd = valNumber * tokenPrice;
    return `$${totalUsd.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
  }, [value, token?.priceUsd]);

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
      {token && (
        <div className="flex items-center justify-between text-gray-400">
          <span>{usdPrice}</span>
          <span>
            {formattedValue} {balance?.symbol}
          </span>
        </div>
      )}
    </div>
  );
}
