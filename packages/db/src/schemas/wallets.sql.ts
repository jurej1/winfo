import { relations } from "drizzle-orm";
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { walletNetWorths } from "./net-worths.sql";

export const wallets = pgTable("wallets", {
  address: text("address").primaryKey(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

// one to many
// one wallet can have many net worths
export const walletsRelations = relations(wallets, ({ many }) => ({
  netWorths: many(walletNetWorths),
}));
