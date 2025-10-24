import { useWalletApprovals } from "@/util/api/hooks/useWalletApprovals";
import { Address } from "viem";
import { Spinner } from "./ui/spinner";
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

type Props = {
  address: Address;
  chainId: number;
};
export function WalletApprovals({ address, chainId }: Props) {
  const { data, isLoading, remove } = useWalletApprovals(address, chainId);

  if (isLoading || !data) {
    return (
      <div className="flex w-full justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <h2 className="mb-2 text-xl">Approvals</h2>
      <Table>
        <TableCaption>
          A list of Approvals for {shortenAddress(address)}.{" "}
          {data.length === 0 && "Currently you do not have any."}
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Hash</TableHead>
            <TableHead>Value</TableHead>
            <TableHead>Timestamp</TableHead>
            <TableHead>Value at Risk</TableHead>
            <TableHead>Spender</TableHead>
            <TableHead>Action</TableHead>
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
  );
}
