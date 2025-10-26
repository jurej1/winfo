import { useSwapStore } from "@/util/hooks/useSwapStore";
import { Input } from "../ui/input";
import { useAccount, useBalance } from "wagmi";
import { formatCurrency } from "@coingecko/cryptoformat";
import { Address } from "viem";

type Props = {
  title: string;
  tokenAddress?: Address;
  onChanged: (val: string) => void;
  value: string;
};

export function DexCardInput({ title, tokenAddress, onChanged, value }: Props) {
  const { chainId, address } = useAccount();

  const { data: balance } = useBalance({
    chainId: chainId,
    address: address,
    token: tokenAddress,
    query: {
      // 30sec refetch interval
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

      <div className="flex items-center gap-2">
        <Input
          type="number"
          placeholder="0.0"
          value={value}
          onChange={(event) => {
            const val = event.target.value;
            onChanged(val);
          }}
        />
        <span>TOKEN</span>
      </div>
      <div className="flex items-center justify-between">
        <span></span>
        <span>{formattedAmount}</span>
      </div>
    </div>
  );
}
