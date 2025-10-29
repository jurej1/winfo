import { dexTokens } from "../schemas";

export type TokenDB = Omit<typeof dexTokens.$inferSelect, "address"> & {
  address: `0x${string}`;
};

export type TokenDBwithPrice = TokenDB & {
  priceUsd: number;
};

export type InsertTokenDB = typeof dexTokens.$inferInsert;
