import { integer, pgTable, primaryKey, text } from "drizzle-orm/pg-core";

export const tokens = pgTable(
  "tokens",
  {
    address: text("address").notNull(),
    name: text("name").notNull(),
    logo: text("logo").notNull(),
    chainId: integer("chain_id").notNull(),
    symbol: text("symbol").notNull(),
    decimals: integer("decimals").notNull(),
  },
  (table) => [
    primaryKey({
      name: "tokens_pk_address_symbol_chainId",
      columns: [table.chainId, table.address, table.symbol],
    }),
  ],
);
