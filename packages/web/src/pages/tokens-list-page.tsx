"use client";

import { TokenSearchDialog } from "@/components/token-search-dialog";
import { TokenListRow } from "@/components/tokens-list/token-list-row";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useTokensList } from "@/util/hooks/useTokensList";

export default function TokensListPage() {
  const {
    data,
    isLoading,
    error,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useTokensList();

  if (isLoading) {
    return (
      <div className="mt-4 flex justify-center">
        <Spinner />
      </div>
    );
  }

  if (isError) {
    return <div>There was an error {error.message}</div>;
  }

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-4 py-2">
      <TokenSearchDialog />
      <Table>
        <TableCaption>
          <Button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage || !hasNextPage}
          >
            {isFetchingNextPage ? <Spinner /> : "Load More"}
          </Button>
        </TableCaption>
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
          {data?.pages.map((tokens) =>
            tokens.map((token) => (
              <TokenListRow key={token.id} token={token} />
            )),
          )}
        </TableBody>
      </Table>
    </div>
  );
}
