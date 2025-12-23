"use client";

import { Spinner } from "./spinner";
import { Card, CardContent } from "./card";
import { motion } from "framer-motion";
import { scaleUp } from "@/lib/animations";
import { cn } from "@/lib/utils";

type LoadingCardProps = {
  message?: string;
  className?: string;
};

export function LoadingCard({
  message = "Loading...",
  className = ""
}: LoadingCardProps) {
  return (
    <motion.div
      variants={scaleUp}
      initial="hidden"
      animate="visible"
    >
      <Card variant="glass" className={cn("min-h-[300px]", className)}>
        <CardContent className="flex h-full w-full flex-col items-center justify-center p-8">
          <Spinner className="h-8 w-8 text-accent-purple-500" />
          <p className="mt-4 text-sm font-medium text-muted-foreground">
            {message}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}

