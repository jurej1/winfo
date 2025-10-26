import { Input } from "../ui/input";
import { useAccount, useBalance } from "wagmi";
import { formatCurrency } from "@coingecko/cryptoformat";
import { TokenUniswap } from "@w-info-sst/types";
import { DexSelectToken } from "./dex-select-token";

type Props = {
  title: string;
  token?: TokenUniswap;
  onValChanged: (val: string) => void;
  onSetToken: (token: TokenUniswap) => void;
  value: string;
};

export function DexCardInput({
  title,
  token,
  onValChanged,
  value,
  onSetToken,
}: Props) {
  const { chainId, address } = useAccount();

  const { data: balance } = useBalance({
    chainId: chainId,
    address: address,
    token: token?.address,
    query: {
      refetchInterval: 1000 * 30,
    },
  });

  const formattedAmount = formatCurrency(
    Number(balance?.formatted),
    balance?.symbol ?? "",
  );

  return (
    <div className="flex flex-col gap-2 border">
      <p className="text-md text-gray-400">{title}</p>

      <div className="flex items-center gap-4">
        <Input
          type="number"
          placeholder="0.0"
          value={value}
          onChange={(event) => {
            const val = event.target.value;
            onValChanged(val);
          }}
        />
        <DexSelectToken token={token} onSetToken={onSetToken} />
      </div>
      <div className="flex items-center justify-between">
        <span></span>
        <span>{formattedAmount}</span>
      </div>
    </div>
  );
}
