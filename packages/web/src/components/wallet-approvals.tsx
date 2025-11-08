import { Address } from "viem";
import { LoadingCard } from "./ui/loading-card";
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

import { WalletApprovalRow } from "./wallet-approval-row";
import { shortenAddress } from "@/lib/shorten-address";
import { WalletApprovalsInfo } from "./wallet-approvals-info";
import { useWalletApprovals } from "@/util/hooks/wallet/useWalletApprovals";
import { MdSecurity } from "react-icons/md";

type Props = {
  address: Address;
  chainId: number;
};
export function WalletApprovals({ address, chainId }: Props) {
  const { data, isLoading, remove } = useWalletApprovals(address, chainId);

  if (isLoading || !data) {
    return <LoadingCard message="Loading Wallet Approvals..." />;
  }

  return (
    <div className="w-full rounded-lg border border-neutral-200 bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="mb-6 flex items-start justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <MdSecurity className="h-5 w-5 text-neutral-500" />
            <h2 className="text-base font-semibold text-primary-dark-900">
              Wallet Approvals
            </h2>
          </div>
          <p className="text-sm text-neutral-600">
            Token approvals for {shortenAddress(address)}
            {data.length === 0 && " - No active approvals"}
          </p>
        </div>
        <WalletApprovalsInfo approvals={data} />
      </div>

      {/* Table Container */}
      <div className="overflow-hidden rounded-lg border border-neutral-200">
        <Table>
          <TableHeader>
            <TableRow className="border-neutral-200 bg-neutral-50 hover:bg-neutral-50">
              <TableHead className="font-medium text-neutral-600">
                Transaction
              </TableHead>
              <TableHead className="font-medium text-neutral-600">
                Value
              </TableHead>
              <TableHead className="font-medium text-neutral-600">
                Timestamp
              </TableHead>
              <TableHead className="font-medium text-neutral-600">
                Value at Risk
              </TableHead>
              <TableHead className="font-medium text-neutral-600">
                Spender
              </TableHead>
              <TableHead className="text-right font-medium text-neutral-600">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((approval) => (
              <WalletApprovalRow
                key={approval.transaction_hash}
                approval={approval}
                onRevokeSuccess={remove}
              />
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
