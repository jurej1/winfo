import { text } from "drizzle-orm/pg-core";
import { wallets } from "../schemas";

export type InsertWallet = typeof wallets.$inferInsert;

export type WalletDb = typeof wallets.$inferSelect;

export const WalletColumnType = text("address");
