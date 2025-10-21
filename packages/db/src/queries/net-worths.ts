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
