import { eq } from "drizzle-orm";
import { db } from "../drizzle";
import { tokens } from "../schemas";
import { InsertTokenDB } from "../types/tokens.type";

export const addToken = (values: InsertTokenDB) =>
  db().insert(tokens).values(values).onConflictDoNothing().returning();

export const addManyTokens = (values: InsertTokenDB[]) =>
  db().insert(tokens).values(values).onConflictDoNothing().returning();

export const getTokensByChainId = (chainId: number) =>
  db().select().from(tokens).where(eq(tokens.chainId, chainId));
