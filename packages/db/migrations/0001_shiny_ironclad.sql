CREATE TABLE "net-worths" (
	"address" varchar(42) NOT NULL,
	"total_networth_usd" text NOT NULL,
	"native_balance" text NOT NULL,
	"native_balance_formatted" text NOT NULL,
	"native_balance_usd" text NOT NULL,
	"token_balance_usd" text,
	"networth_usd" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "net-worths" ADD CONSTRAINT "net-worths_address_wallets_address_fk" FOREIGN KEY ("address") REFERENCES "public"."wallets"("address") ON DELETE cascade ON UPDATE no action;