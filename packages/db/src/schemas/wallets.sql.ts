import { relations } from "drizzle-orm";
import { pgTable, timestamp } from "drizzle-orm/pg-core";
import { WalletColumnType } from "../types";
import { walletNetWorths } from "./net-worths.sql";

export const wallets = pgTable("wallets", {
  address: WalletColumnType.primaryKey().notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

// one to many
// one wallet can have many net worths
export const walletsRelations = relations(wallets, ({ many }) => ({
  netWorths: many(walletNetWorths),
}));
