"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useCallback, useState } from "react";
import { DexTokenSelectRow } from "./dex-token-select-row";

import { Button } from "../ui/button";

import Image from "next/image";
import { TokenDBwithPrice } from "@w-info-sst/db";
import { useTokens } from "@/util/hooks/useTokens";

type Props = {
  token?: TokenDBwithPrice;
  onSetToken: (token: TokenDBwithPrice) => void;
};

export function DexSelectToken({ token, onSetToken }: Props) {
  const [open, setOpen] = useState<boolean>(false);

  const handleOnPressed = useCallback(
    (token: TokenDBwithPrice) => {
      setOpen((prev) => !prev);
      onSetToken(token);
    },
    [setOpen, onSetToken],
  );

  const { data: tokens, isLoading: loadingTokens } = useTokens();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        asChild
        disabled={loadingTokens}
        className="h-10 w-30 cursor-pointer"
      >
        {!token ? (
          <Button>Select Token</Button>
        ) : (
          <Button className="w-30">
            <div className="flex gap-2">
              <Image
                src={token.logo ?? ""}
                height={20}
                width={20}
                alt={`${token.symbol} image`}
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
        <ul className="flex max-h-96 flex-col gap-2 overflow-y-auto">
          {tokens?.map((token) => (
            <DexTokenSelectRow
              token={token}
              key={token.address}
              onPressed={() => handleOnPressed(token)}
            />
          ))}
        </ul>
      </DialogContent>
    </Dialog>
  );
}
