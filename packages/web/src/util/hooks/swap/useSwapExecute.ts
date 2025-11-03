import {
  useSendTransaction,
  useSignTypedData,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Hash,
  UserRejectedRequestError,
  TransactionExecutionError,
  erc20Abi,
  Address,
} from "viem";
import { SignTypedDataVariables } from "wagmi/query";
import { toast } from "sonner";
import { attachSignatureToTransactionData } from "./actions/attach-signature-to-transaction-data";
import { useSwapAddTransaction } from "./useSwapAddTransaction";
import { GetQuote0XResponse } from "@w-info-sst/types";
import { add } from "date-fns";

type UseSwapExecuteProps = {
  quote: GetQuote0XResponse | undefined;
};

export const useSwapExecute = ({ quote }: UseSwapExecuteProps) => {
  const transaction = quote?.transaction;
  const permit2 = quote?.permit2;

  const allowanceIssue = quote?.issues?.allowance;

  const [waitHash, setWaitHash] = useState<Hash>();

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

  const { writeContractAsync: approveSpenderAsync } = useWriteContract();

  const isApprovalNeeded = useMemo(() => {
    const notDefined = !!allowanceIssue && allowanceIssue.actual === "0";

    const isLess =
      BigInt(allowanceIssue?.actual ?? 0) < BigInt(quote?.sellAmount ?? 0);

    return notDefined || isLess;
  }, [allowanceIssue, quote?.sellAmount]);

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

  const approveSpender = useCallback(async () => {
    const spender = quote?.allowanceTarget as Address | undefined;
    const address = quote?.sellToken as Address | undefined;
    const sellAmount = quote?.sellAmount as string | undefined;

    if (!spender) {
      throw new Error("Spender is not undefined");
    }

    if (!address) {
      throw new Error("Address is not defined");
    }

    if (!sellAmount) {
      throw new Error("Sell amount is not defined");
    }

    const response = await approveSpenderAsync({
      abi: erc20Abi,
      functionName: "approve",
      args: [spender, BigInt(sellAmount)],
      address: address,
    });
  }, [quote]);

  const executeSwapTransaction = useCallback(async () => {
    if (!transaction) {
      toast.error("Transaction is not defined");
      return;
    }

    try {
      if (isApprovalNeeded) {
        await approveSpender();
      }

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
