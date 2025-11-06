import { db } from "../drizzle";
import { tokens } from "../schemas";
import { InsertTokenDB } from "../types/tokens.type";

export const addToken = (values: InsertTokenDB) =>
  db().insert(tokens).values(values).onConflictDoNothing().returning();

export const addManyTokens = (values: InsertTokenDB[]) =>
  db().insert(tokens).values(values).onConflictDoNothing().returning();
