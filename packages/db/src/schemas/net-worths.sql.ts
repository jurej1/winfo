import { relations } from "drizzle-orm";
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { WalletColumnType } from "../types";
import { wallets } from "./wallets.sql";

export const walletNetWorths = pgTable("net-worths", {
  address: WalletColumnType.notNull().references(() => wallets.address, {
    onDelete: "cascade",
  }),

  totalNetWorthUsd: text("total_networth_usd").notNull(),

  nativeBalance: text("native_balance").notNull(),
  nativeBalanceFormatted: text("native_balance_formatted").notNull(),
  nativeBalanceUsd: text("native_balance_usd").notNull(),
  tokenBalanceUsd: text("token_balance_usd"),
  networthUsd: text("networth_usd").notNull(),

  createdAt: timestamp("created_at", { mode: "date" }).defaultNow(),
});

// one to many
// one wallet address can have many wallet net worths
export const walletNetWorthRelations = relations(
  walletNetWorths,
  ({ one }) => ({
    wallet: one(wallets, {
      fields: [walletNetWorths.address],
      references: [wallets.address],
    }),
  }),
);
