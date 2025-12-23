"use client";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { TokenDetailsInfo } from "./token-details-info";
import { useTokensList } from "@/util/hooks/useTokensList";
import { LoadingCard } from "../ui/loading-card";
import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";

type Props = {
  id: string;
  className?: string;
};

export default function TokenDetailsCard({ id, className }: Props) {
  const { data, isLoading, isError, error } = useTokensList();

  if (isLoading) {
    return <LoadingCard message="Loading token details..." />;
  }

  const token = data?.pages.flat().find((token) => token.id === id);

  if (isError || !token) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "We couldn't load this token's information.";

    return (
      <Card variant="glass-subtle" className="min-h-[320px]">
        <CardContent className="flex flex-col items-center justify-center p-10 text-center">
          <div className="rounded-full bg-error-100 p-3 text-error-600 dark:bg-error-950/30">
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2 className="mt-4 text-lg font-semibold">
            Token Not Found
          </h2>
          <p className="mt-2 max-w-md text-sm text-muted-foreground">{errorMessage}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
    >
      <Card variant="glass" className={className}>
        <CardHeader className="border-b border-white/10">
          <CardTitle className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
            Token Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <TokenDetailsInfo token={token} />
        </CardContent>
      </Card>
    </motion.div>
  );
}
