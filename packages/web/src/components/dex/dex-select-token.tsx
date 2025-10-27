import { TokenUniswap } from "@w-info-sst/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useSwapTokens } from "@/util/hooks/useSwapTokens";
import { useAccount } from "wagmi";
import { useCallback, useMemo, useState } from "react";
import { DexTokenSelectRow } from "./dex-token-select-row";

import { Button } from "../ui/button";

import Image from "next/image";
import { TokenDB } from "@w-info-sst/db";

type Props = {
  token?: TokenDB;
  onSetToken: (token: TokenDB) => void;
};

export function DexSelectToken({ token, onSetToken }: Props) {
  const { chainId } = useAccount();

  const [open, setOpen] = useState<boolean>(false);

  const { data } = useSwapTokens(chainId!);

  const handleOnPressed = useCallback(
    (token: TokenDB) => {
      setOpen((prev) => !prev);
      onSetToken(token);
    },
    [setOpen, onSetToken],
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {!token ? (
          <Button>Select Token</Button>
        ) : (
          <Button>
            <div className="flex gap-2">
              <Image
                src={token.image ?? ""}
                height={20}
                width={20}
                alt={token.symbol}
                draggable={false}
              />
              <p>{token.symbol}</p>
            </div>
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Select Token</DialogTitle>
        <DialogDescription>Please select a token for swap</DialogDescription>
        {data && (
          <ul className="flex max-h-96 flex-col gap-2 overflow-y-auto">
            {data.map((token) => (
              <DexTokenSelectRow
                token={token}
                key={token.address}
                onPressed={() => handleOnPressed(token)}
              />
            ))}
          </ul>
        )}
      </DialogContent>
    </Dialog>
  );
}
