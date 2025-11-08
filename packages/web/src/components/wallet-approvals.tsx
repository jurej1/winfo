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
    <div className="group border-platinum-300 from-seasalt-DEFAULT via-anti-flash_white-DEFAULT to-platinum-DEFAULT relative m-2 h-full w-full overflow-hidden rounded-3xl border bg-gradient-to-br p-8 shadow-xl transition-all duration-300 hover:shadow-2xl">
      {/* Decorative background elements */}
      <div className="from-french_gray-400/20 to-slate_gray-400/10 absolute -top-20 -right-20 h-40 w-40 rounded-full bg-gradient-to-br blur-3xl" />
      <div className="from-platinum-400/20 to-french_gray-300/10 absolute -bottom-16 -left-16 h-32 w-32 rounded-full bg-gradient-to-tr blur-2xl" />

      <div className="relative z-10">
        {/* Header */}
        <div className="mb-6 flex items-start justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <MdSecurity className="text-slate_gray-DEFAULT h-5 w-5" />
              <h2 className="text-slate_gray-DEFAULT text-lg font-semibold tracking-wider uppercase">
                Wallet Approvals
              </h2>
            </div>
            <p className="text-outer_space-DEFAULT text-sm">
              Token approvals for {shortenAddress(address)}
              {data.length === 0 && " - No active approvals"}
            </p>
          </div>
          <WalletApprovalsInfo approvals={data} />
        </div>

        {/* Table Container */}
        <div className="overflow-hidden rounded-2xl bg-white/60 backdrop-blur-sm">
          <Table>
            <TableHeader>
              <TableRow className="border-platinum-300 hover:bg-transparent">
                <TableHead className="text-onyx-DEFAULT font-bold uppercase">
                  Transaction
                </TableHead>
                <TableHead className="text-onyx-DEFAULT font-bold uppercase">
                  Value
                </TableHead>
                <TableHead className="text-onyx-DEFAULT font-bold uppercase">
                  Timestamp
                </TableHead>
                <TableHead className="text-onyx-DEFAULT font-bold uppercase">
                  Value at Risk
                </TableHead>
                <TableHead className="text-onyx-DEFAULT font-bold uppercase">
                  Spender
                </TableHead>
                <TableHead className="text-onyx-DEFAULT text-right font-bold uppercase">
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
    </div>
  );
}
