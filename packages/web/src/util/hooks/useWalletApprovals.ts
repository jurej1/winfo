import { useQuery } from "@tanstack/react-query";

import { Address } from "viem";
import { useCallback, useEffect, useState } from "react";
import { ApprovalResult } from "@w-info-sst/types";
import { fetchWalletApprovals } from "../api/wallet";

export const useWalletApprovals = (address: Address, chainId: number) => {
  const ONE_HOUR = 60 * 60 * 1000;

  const [approvalsList, setApprovalsList] = useState<ApprovalResult[]>([]);

  const { data, isLoading } = useQuery({
    queryFn: () => fetchWalletApprovals(address, chainId),
    queryKey: ["wallet-approvals", address, chainId],
    gcTime: ONE_HOUR,
    staleTime: ONE_HOUR,
  });

  useEffect(() => {
    if (data?.result) {
      setApprovalsList(data.result);
    }
  }, [data]);

  const removeApproval = useCallback((hash: string) => {
    setApprovalsList((prev) =>
      prev.filter((approval) => approval.transaction_hash !== hash),
    );
  }, []);

  return {
    data: approvalsList,
    isLoading,
    remove: removeApproval,
  };
};
