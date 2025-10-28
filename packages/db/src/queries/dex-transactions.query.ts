import { desc, eq } from "drizzle-orm";
import { db } from "../drizzle";
import { dexTransactions } from "../schemas";
import { InsertDexTransactionDB } from "../types";

export const addDexTransaction = (tx: InsertDexTransactionDB) =>
  db().insert(dexTransactions).values(tx).returning();

export const getRecentTransactions = (chainId: number) =>
  db()
    .select()
    .from(dexTransactions)
    .where(eq(dexTransactions.chainId, chainId))
    .orderBy(desc(dexTransactions.createdAt))
    .limit(20);
