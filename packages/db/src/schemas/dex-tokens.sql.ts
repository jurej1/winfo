import {
  boolean,
  integer,
  pgTable,
  primaryKey,
  smallint,
  text,
} from "drizzle-orm/pg-core";

export const dexTokens = pgTable(
  "dex-tokens",
  {
    chainId: integer("chainId").notNull(),
    address: text("address").notNull(),
    name: text("name").notNull(),
    symbol: text("symbol").notNull(),
    image: text("image"),
    decimals: smallint("decimals").notNull(),
    native: boolean("native").notNull(),
  },
  (table) => [
    primaryKey({
      name: "pk_chain_address",
      columns: [table.address, table.chainId],
    }),
  ],
);
