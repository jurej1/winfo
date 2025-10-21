import { eq } from "drizzle-orm";
import { db } from "../drizzle";
import { wallets } from "../schemas";

export const addWallet = (address: string) =>
  db()
    .insert(wallets)
    .values({ address })
    .onConflictDoNothing({ target: wallets.address })
    .returning();

export const getWallet = (address: string) =>
  db().query.wallets.findFirst({ where: eq(wallets.address, address) });

export const getWallets = () => db().query.wallets.findMany();
