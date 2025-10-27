CREATE TABLE "dex-tokens" (
	"chainId" integer NOT NULL,
	"address" text NOT NULL,
	"name" text NOT NULL,
	"symbol" text NOT NULL,
	"image" text,
	CONSTRAINT "pk_chain_address" PRIMARY KEY("address","chainId")
);
