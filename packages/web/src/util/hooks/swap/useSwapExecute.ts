import {
  useSendTransaction,
  useSignTypedData,
  useWaitForTransactionReceipt,
} from "wagmi";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Hash,
  UserRejectedRequestError,
  TransactionExecutionError,
} from "viem";
import { SignTypedDataVariables } from "wagmi/query";
import { toast } from "sonner";
import { attachSignatureToTransactionData } from "./actions/attach-signature-to-transaction-data";
import { useSwapAddTransaction } from "./useSwapAddTransaction";
import { GetQuote0XResponse } from "@w-info-sst/types";

type UseSwapExecuteProps = {
  quote: GetQuote0XResponse | undefined;
};

export const useSwapExecute = ({ quote }: UseSwapExecuteProps) => {
  const transaction = quote?.transaction;
  const permit2 = quote?.permit2;

  const [waitHash, setWaitHash] = useState<Hash>();

  const allowanceIssue = quote?.issues?.allowance;

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

  const isApprovalNeeded = useMemo(() => {
    return !!allowanceIssue && allowanceIssue.actual === "0";
  }, [allowanceIssue]);

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
      let txData = transaction.data;

      const data = await signSwapTransaction();
      if (data) txData = data;

      const hash = await sendTransactionAsync({ ...transaction, data: txData });
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

      const { chainId, transactionHash, blockHash } = swapTransactionData;

      sendTransactionToDB({ chainId, transactionHash, blockHash });
    }
  }, [isSwapSuccess, waitHash, sendTransactionToDB]);

  return {
    isApprovalNeeded,
    executeSwapTransaction,
  };
};
