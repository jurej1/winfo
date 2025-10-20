import { pgTable, timestamp, varchar } from "drizzle-orm/pg-core";

export const wallets = pgTable("wallets", {
  address: varchar("address", { length: 42 }).primaryKey().notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});
