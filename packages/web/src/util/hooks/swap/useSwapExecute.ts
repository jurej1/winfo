import {
  useSendTransaction,
  useSignTypedData,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { useSwapStore } from "./useSwapStore";
import { useCallback, useEffect, useMemo, useState } from "react";
import { concat, erc20Abi, Hash, Hex, numberToHex, size } from "viem";
import { SignTypedDataVariables } from "wagmi/query";
import { toast } from "sonner";

const REQUIRED_SPENDER_ADDRESS = "0x000000000022d473030f116ddee9f6b43ac78ba3";

export const useSwapExecute = () => {
  const clearSwapForm = useSwapStore((state) => state.clearForm);

  const transaction = useSwapStore((state) => state.quote?.transaction);
  const permit2 = useSwapStore((state) => state.quote?.permit2);

  const sellToken = useSwapStore((state) => state.sellToken);
  const sellAmount = useSwapStore((state) => state.sellAmount);

  const [waitHash, setWaitHash] = useState<Hash>();

  const allowanceIssue = useSwapStore(
    (state) => state.price?.issues?.allowance,
  );
  const loading = useSwapStore(
    (state) => state.loadingPrice || state.loadingQuote,
  );

  // After hash
  const { isSuccess: isSwapSuccess, data: swapTransactionData } =
    useWaitForTransactionReceipt({
      hash: waitHash,
      query: {
        enabled: !!waitHash,
      },
    });

  const { sendTransactionAsync } = useSendTransaction();
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

  const signSwapTransaction = useCallback(async () => {
    if (!transaction) return;

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
  }, [transaction, permit2, signTypedDataAsync]);

  const executeSwapTransaction = useCallback(async () => {
    if (!transaction) return;

    if (isApprovalNeeded) await approveToken();

    signSwapTransaction();

    const hash = await sendTransactionAsync(transaction);

    setWaitHash(hash);
  }, [
    sendTransactionAsync,
    transaction,
    signTypedDataAsync,
    signSwapTransaction,
    approveToken,
    isApprovalNeeded,
    setWaitHash,
  ]);

  useEffect(() => {
    if (isSwapSuccess) {
      toast.success(`Transaction Successfull ${waitHash}`);
      clearSwapForm();
    }
  }, [isSwapSuccess, waitHash, clearSwapForm]);

  useEffect(() => {
    console.log("swapTransaction", swapTransactionData);
  }, [swapTransactionData]);

  return {
    isApprovalNeeded,
    executeSwapTransaction,
    loading,
    transaction,
    sellToken,
    sellAmount,
  };
};
