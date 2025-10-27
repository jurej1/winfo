import { dexTokens } from "../schemas";

export type TokenDB = typeof dexTokens.$inferSelect;

export type InsertTokenDB = typeof dexTokens.$inferInsert;
