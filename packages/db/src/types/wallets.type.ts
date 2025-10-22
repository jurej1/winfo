import { wallets } from "../schemas";

export type InsertWallet = typeof wallets.$inferInsert;

export type WalletDb = typeof wallets.$inferSelect;
