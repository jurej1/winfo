CREATE TABLE "wallets" (
	"address" varchar(42) PRIMARY KEY NOT NULL,
	"created_at" timestamp with time zone DEFAULT now()
);
