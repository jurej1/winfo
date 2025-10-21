import { walletNetWorths } from "../schemas/net-worths.sql";

export type InsertWalletNetWorth = typeof walletNetWorths.$inferInsert;

export type WalletNetWorthDb = typeof walletNetWorths.$inferSelect;
