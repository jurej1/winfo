"use client";

import { TokenSearchDialog } from "@/components/token-search-dialog";
import { TokenListRow } from "@/components/tokens-list/token-list-row";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { LoadingCard } from "@/components/ui/loading-card";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useTokensList } from "@/util/hooks/useTokensList";
import { AnimatedBackground } from "@/components/landing/animated-background";
import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";

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
      <>
        <AnimatedBackground />
        <div className="mx-auto max-w-7xl p-6">
          <LoadingCard message="Loading token market data..." />
        </div>
      </>
    );
  }

  if (isError) {
    return (
      <>
        <AnimatedBackground />
        <div className="mx-auto max-w-7xl p-6">
          <Card variant="glass-subtle" className="min-h-[320px]">
            <CardContent className="flex flex-col items-center justify-center p-10 text-center">
              <div className="rounded-full bg-error-100 p-3 text-error-600 dark:bg-error-950/30">
                <Spinner className="size-5 animate-none" />
              </div>
              <h2 className="mt-4 text-lg font-semibold">
                Something Went Wrong
              </h2>
              <p className="mt-2 max-w-md text-sm text-muted-foreground">
                {errorMessage}
              </p>
            </CardContent>
          </Card>
        </div>
      </>
    );
  }

  return (
    <>
      <AnimatedBackground />
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        className="mx-auto flex max-w-7xl flex-col gap-6 p-6"
      >
        <Card variant="glass-elevated">
          <CardHeader className="border-b border-white/10">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="space-y-1.5">
                <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                  Market Overview
                </p>
                <CardTitle className="text-xl">
                  Token Performance
                </CardTitle>
                <CardDescription>
                  Track top crypto assets, monitor intraday momentum, and open token
                  details in a single place.
                </CardDescription>
              </div>
              <div className="w-full md:w-auto">
                <TokenSearchDialog />
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <div className="glass-subtle rounded-lg overflow-hidden">
              <Table className="min-w-[960px]">
                <TableHeader>
                  <TableRow className="border-border hover:bg-transparent">
                    <TableHead className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                      Token
                    </TableHead>
                    <TableHead className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                      Price
                    </TableHead>
                    <TableHead className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                      Chg 24h
                    </TableHead>
                    <TableHead className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                      Chg 1h
                    </TableHead>
                    <TableHead className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                      Market Cap
                    </TableHead>
                    <TableHead className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                      Total Volume
                    </TableHead>
                    <TableHead className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                      High 24h
                    </TableHead>
                    <TableHead className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                      Low 24h
                    </TableHead>
                    <TableHead className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                      Circulating Supply
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tokens.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={9} className="px-2 py-20 text-center">
                        <div className="flex flex-col items-center gap-2">
                          <p className="text-sm font-medium">
                            No tokens available
                          </p>
                          <p className="text-xs text-muted-foreground">
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
          </CardContent>

          <CardFooter className="flex items-center justify-center border-t border-white/10">
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
          </CardFooter>
        </Card>
      </motion.div>
    </>
  );
}
