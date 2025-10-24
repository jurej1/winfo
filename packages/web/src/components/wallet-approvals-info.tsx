import { formatCurrency } from "@coingecko/cryptoformat";
import { ApprovalResult } from "@w-info-sst/types";
import { useMemo } from "react";

type Props = {
  approvals: ApprovalResult[];
};
export function WalletApprovalsInfo({ approvals }: Props) {
  const length = approvals.length;

  const totalValueAtRisk = useMemo(() => {
    return approvals.reduce((total, approval) => {
      const value = Number(approval.token.usd_at_risk);

      return total + (value || 0);
    }, 0);
  }, [approvals]);

  return (
    <div className="grid grid-cols-2 gap-4 rounded-xl border p-2">
      <div className="flex flex-col items-center">
        <span className="text-xs text-gray-400">Approvals</span>
        <span>{length}</span>
      </div>
      <div className="flex flex-col items-center">
        <span className="text-xs text-gray-400">USD at Risk</span>
        <span>{formatCurrency(totalValueAtRisk, "$")}</span>
      </div>
    </div>
  );
}
