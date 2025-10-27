import { walletNetWorths } from "../schemas";

export type InsertWalletNetWorth = typeof walletNetWorths.$inferInsert;

export type WalletNetWorthDb = typeof walletNetWorths.$inferSelect;
