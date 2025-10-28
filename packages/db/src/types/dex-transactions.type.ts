import { dexTransactions } from "../schemas";

export type DexTransactionDB = typeof dexTransactions.$inferSelect;

export type InsertDexTransactionDB = typeof dexTransactions.$inferInsert;
