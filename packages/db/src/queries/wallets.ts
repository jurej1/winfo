import { db } from "../drizzle";
import { wallets } from "../schemas";

export const addWallet = (address: string) =>
  db()
    .insert(wallets)
    .values({ address })
    .onConflictDoNothing({ target: wallets.address })
    .returning();
