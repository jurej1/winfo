"use client";

import { TokenSearchDialog } from "@/components/token-search-dialog";
import { TokenListRow } from "@/components/tokens-list/token-list-row";
import { Spinner } from "@/components/ui/spinner";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useTokensList } from "@/util/hooks/useTokensList";

export default function TokensList() {
  const { data, isLoading, error, isError } = useTokensList();

  if (isLoading) {
    return (
      <div className="mt-4 flex justify-center">
        <Spinner />
      </div>
    );
  }

  if (isError) {
    return <div>there was an error {error.message}</div>;
  }

  if (!data || data.length === 0) {
    return <div>List is empty.</div>;
  }

  // const listItems = data?.map((token) => TokenListItem({ token }));

  return (
    <div className="m-auto flex max-w-7xl flex-col py-2">
      <TokenSearchDialog />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Token</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Chg 24h</TableHead>
            <TableHead>Chg 1h</TableHead>
            <TableHead>Market Cap</TableHead>
            <TableHead>Total Volume</TableHead>
            <TableHead>High 24h</TableHead>
            <TableHead>Low 24h</TableHead>
            <TableHead>Circulating Supply</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((t) => (
            <TokenListRow token={t} key={t.id} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
