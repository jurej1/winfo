import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const dexTransactions = pgTable("dex-transactions", {
  transactionHash: text("transactionHash").primaryKey(),
  chainId: integer("chainId").notNull(),
  blockHash: text("blockHash"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});
