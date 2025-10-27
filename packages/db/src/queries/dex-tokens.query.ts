import { eq } from "drizzle-orm";
import { db } from "../drizzle";
import { dexTokens } from "../schemas";
import { InsertTokenDB } from "../types";

export const getTokensByChainId = (chainId: number) =>
  db().select().from(dexTokens).where(eq(dexTokens.chainId, chainId));

export const addToken = (token: InsertTokenDB) =>
  db().insert(dexTokens).values(token).onConflictDoNothing().returning();
