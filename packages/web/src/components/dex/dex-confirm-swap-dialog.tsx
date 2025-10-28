"use client";

import { useSwapStore } from "@/util/hooks/swap/useSwapStore";
import { Button } from "../ui/button";
import { useSendTransaction, useSignTypedData, useWriteContract } from "wagmi";
import { useCallback, useMemo } from "react";
import { SignTypedDataVariables } from "wagmi/query";
import { concat, Hex, numberToHex, size } from "viem";
import { erc20Abi } from "viem";

const REQUIRED_SPENDER_ADDRESS = "0x000000000022d473030f116ddee9f6b43ac78ba3";

export function DexConfirmSwapDialog() {
  const transaction = useSwapStore((state) => state.quote?.transaction);
  const permit2 = useSwapStore((state) => state.quote?.permit2);
  const sellToken = useSwapStore((state) => state.sellToken);
  const sellAmount = useSwapStore((state) => state.sellAmount);
  const allowanceIssue = useSwapStore(
    (state) => state.price?.issues?.allowance,
  );
  const loading = useSwapStore(
    (state) => state.loadingPrice || state.loadingQuote,
  );

  const { sendTransaction } = useSendTransaction();
  const { signTypedDataAsync } = useSignTypedData();
  const { writeContractAsync } = useWriteContract();

  const isApprovalNeeded = useMemo(() => {
    return !!allowanceIssue && allowanceIssue.actual === "0";
  }, [allowanceIssue]);

  const approveToken = useCallback(async () => {
    if (!sellToken) return;

    const amountToApprove = BigInt(
      Math.floor(parseFloat(sellAmount) * Math.pow(10, sellToken.decimals)),
    );

    try {
      await writeContractAsync({
        address: sellToken.address as `0x${string}`,
        abi: erc20Abi,
        functionName: "approve",
        args: [REQUIRED_SPENDER_ADDRESS as `0x${string}`, amountToApprove],
      });
    } catch (error) {
      console.error("Approval transaction failed:", error);
    }
  }, [sellToken, sellAmount, writeContractAsync]);

  const executeSwapTransaction = useCallback(async () => {
    if (!transaction) return;

    if (isApprovalNeeded) await approveToken();

    if (permit2?.eip712) {
      try {
        const signature = await signTypedDataAsync(
          permit2.eip712 as SignTypedDataVariables,
        );

        const signatureLengthInHex = numberToHex(size(signature), {
          signed: false,
          size: 32,
        });

        const transactionData = transaction.data as Hex;
        const sigLengthHex = signatureLengthInHex as Hex;
        const sig = signature as Hex;

        transaction.data = concat([transactionData, sigLengthHex, sig]);
      } catch (error) {
        console.error("Signature failed:", error);
        return;
      }
    }

    sendTransaction(transaction);
  }, [sendTransaction, transaction, signTypedDataAsync, permit2]);

  if (isApprovalNeeded) {
    return (
      <Button
        className="w-full py-7"
        onClick={approveToken}
        disabled={loading || !sellToken || parseFloat(sellAmount) <= 0}
      >
        Approve {sellToken?.symbol || "Token"}
      </Button>
    );
  }

  return (
    <Button
      className="w-full py-7"
      onClick={executeSwapTransaction}
      disabled={loading || !transaction}
    >
      SWAP
    </Button>
  );
}
