"use client";

import { TokenSearchDialog } from "@/components/token-search-dialog";
import { TokenListRow } from "@/components/tokens-list/token-list-row";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { LoadingCard } from "@/components/ui/loading-card";
import {
  Table,
  TableBody,
  TableCell,
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

  const tokens = data?.pages.flatMap((tokens) => tokens) ?? [];
  const errorMessage =
    error instanceof Error
      ? error.message
      : "We weren't able to load token market data.";

  if (isLoading) {
    return (
      <div className="mx-auto max-w-7xl p-6">
        <LoadingCard message="Loading token market data..." />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mx-auto max-w-7xl p-6">
        <div className="flex min-h-[320px] flex-col items-center justify-center rounded-xl border border-neutral-200 bg-white p-10 text-center shadow-sm">
          <div className="bg-destructive/10 text-destructive rounded-full p-3">
            <Spinner className="size-5 animate-none" />
          </div>
          <h2 className="mt-4 text-lg font-semibold text-neutral-900">
            Something Went Wrong
          </h2>
          <p className="mt-2 max-w-md text-sm text-neutral-600">
            {errorMessage}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6 p-6">
      <section className="rounded-xl border border-neutral-200 bg-white shadow-sm">
        <div className="flex flex-col gap-4 border-b border-neutral-100 px-6 py-5 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1.5">
            <p className="text-xs font-semibold tracking-wide text-neutral-500 uppercase">
              Market Overview
            </p>
            <h1 className="text-xl font-semibold text-neutral-900">
              Token Performance
            </h1>
            <p className="text-sm text-neutral-600">
              Track top crypto assets, monitor intraday momentum, and open token
              details in a single place.
            </p>
          </div>
          <div className="w-full md:w-auto">
            <TokenSearchDialog />
          </div>
        </div>

        <div className="px-6 py-4">
          <Table className="min-w-[960px]">
            <TableHeader className="bg-neutral-50">
              <TableRow className="border-neutral-200">
                <TableHead className="text-xs font-semibold tracking-wide text-neutral-500 uppercase">
                  Token
                </TableHead>
                <TableHead className="text-xs font-semibold tracking-wide text-neutral-500 uppercase">
                  Price
                </TableHead>
                <TableHead className="text-xs font-semibold tracking-wide text-neutral-500 uppercase">
                  Chg 24h
                </TableHead>
                <TableHead className="text-xs font-semibold tracking-wide text-neutral-500 uppercase">
                  Chg 1h
                </TableHead>
                <TableHead className="text-xs font-semibold tracking-wide text-neutral-500 uppercase">
                  Market Cap
                </TableHead>
                <TableHead className="text-xs font-semibold tracking-wide text-neutral-500 uppercase">
                  Total Volume
                </TableHead>
                <TableHead className="text-xs font-semibold tracking-wide text-neutral-500 uppercase">
                  High 24h
                </TableHead>
                <TableHead className="text-xs font-semibold tracking-wide text-neutral-500 uppercase">
                  Low 24h
                </TableHead>
                <TableHead className="text-xs font-semibold tracking-wide text-neutral-500 uppercase">
                  Circulating Supply
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tokens.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="px-2 py-20 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <p className="text-sm font-medium text-neutral-700">
                        No tokens available
                      </p>
                      <p className="text-xs text-neutral-500">
                        Try searching for a different asset or check back later.
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                tokens.map((token) => (
                  <TokenListRow key={token.id} token={token} />
                ))
              )}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-center gap-3 border-t border-neutral-100 px-6 py-4">
          <Button
            variant="outline"
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage || !hasNextPage}
          >
            {isFetchingNextPage ? (
              <>
                <Spinner className="size-4" />
                Loading More
              </>
            ) : hasNextPage ? (
              "Load More"
            ) : (
              "All Tokens Loaded"
            )}
          </Button>
        </div>
      </section>
    </div>
  );
}
