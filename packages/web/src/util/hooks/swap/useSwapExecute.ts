import {
  useSendTransaction,
  useSignTypedData,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";

import { useSwapStore } from "./useSwapStore";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Address,
  erc20Abi,
  Hash,
  maxUint256,
  UserRejectedRequestError,
  TransactionExecutionError,
} from "viem";
import { SignTypedDataVariables } from "wagmi/query";
import { toast } from "sonner";
import { attachSignatureToTransactionData } from "./actions/attach-signature-to-transaction-data";
import { useSwapAddTransaction } from "./useSwapAddTransaction";

const PERMIT2_SPENDER: Address = "0x000000000022d473030f116ddee9f6b43ac78ba3";

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

  const { mutateAsync: sendTransactionToDB } = useSwapAddTransaction();

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

  // const approvePermit2ForSpending = useCallback(async () => {
  //   if (!sellToken) return;

  //   try {
  //     await writeContractAsync({
  //       address: sellToken.address,
  //       abi: erc20Abi,
  //       functionName: "approve",
  //       args: [PERMIT2_SPENDER, maxUint256],
  //     });
  //   } catch (error) {
  //     console.error("Approval transaction failed:", error);
  //   }
  // }, [sellToken, sellAmount, writeContractAsync]);

  const signSwapTransaction = useCallback(async () => {
    if (!transaction || !permit2?.eip712) return;

    const signature = await signTypedDataAsync(
      permit2.eip712 as SignTypedDataVariables,
    );

    const newData = attachSignatureToTransactionData(
      signature,
      transaction.data,
    );

    return newData;
  }, [transaction, permit2, signTypedDataAsync]);

  const executeSwapTransaction = useCallback(async () => {
    if (!transaction) return;

    try {
      // if (isApprovalNeeded) await approvePermit2ForSpending();

      const data = await signSwapTransaction();

      const hash = await sendTransactionAsync({ ...transaction, data });
      setWaitHash(hash);
    } catch (err) {
      const isDenied =
        err instanceof UserRejectedRequestError ||
        err instanceof TransactionExecutionError;

      if (isDenied) {
        toast.error("Denied 😭");
      }
    }
  }, [
    sendTransactionAsync,
    transaction,
    signTypedDataAsync,
    signSwapTransaction,
    isApprovalNeeded,
    setWaitHash,
  ]);

  useEffect(() => {
    if (isSwapSuccess) {
      toast.success(`Transaction Successfull ${waitHash}`);
      clearSwapForm();

      const { chainId, transactionHash, blockHash } = swapTransactionData;

      sendTransactionToDB({ chainId, transactionHash, blockHash });
    }
  }, [isSwapSuccess, waitHash, clearSwapForm, sendTransactionToDB]);

  return {
    isApprovalNeeded,
    executeSwapTransaction,
    loading,
    transaction,
    sellToken,
    sellAmount,
  };
};
