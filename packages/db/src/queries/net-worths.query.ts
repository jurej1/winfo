import { desc, eq } from "drizzle-orm";
import { db } from "../drizzle";
import { walletNetWorths } from "../schemas";
import { InsertWalletNetWorth } from "../types";

export const addWalletNetWorth = (netWorth: InsertWalletNetWorth) =>
  db()
    .insert(walletNetWorths)
    .values(netWorth)
    .returning()
    .onConflictDoNothing();

export const addManyWalletNetWorths = (netWorths: InsertWalletNetWorth[]) =>
  db().insert(walletNetWorths).values(netWorths).returning();

export const getNetWorthsForSpecificWallet = (
  wallet: string,
  limit: number = 20,
) =>
  db()
    .select()
    .from(walletNetWorths)
    .orderBy(desc(walletNetWorths.createdAt))
    .where(eq(walletNetWorths.address, wallet))
    .limit(limit);
