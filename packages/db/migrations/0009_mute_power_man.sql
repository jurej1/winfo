CREATE TABLE "tokens" (
	"address" text NOT NULL,
	"name" text NOT NULL,
	"logo" text NOT NULL,
	"chain_id" integer NOT NULL,
	"symbol" text NOT NULL,
	"decimals" integer NOT NULL,
	CONSTRAINT "tokens_pk_address_symbol_chainId" PRIMARY KEY("chain_id","address","symbol")
);
