CREATE TABLE "dex-transactions" (
	"transactionHash" text PRIMARY KEY NOT NULL,
	"chainId" integer,
	"blockHash" text
);
