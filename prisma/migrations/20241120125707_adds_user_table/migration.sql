-- CreateEnum
CREATE TYPE "Status" AS ENUM ('SUCCESS', 'FAIL');

-- CreateTable
CREATE TABLE "tokens" (
    "id" SERIAL NOT NULL,
    "address" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,
    "decimals" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "daily_volume" INTEGER NOT NULL,
    "tags" TEXT[],
    "logo_uri" TEXT,
    "tags_birdeye_trending" BOOLEAN NOT NULL,
    "tags_community" BOOLEAN NOT NULL,
    "tags_lst" BOOLEAN NOT NULL,
    "tags_moonshot" BOOLEAN NOT NULL,
    "tags_pump" BOOLEAN NOT NULL,
    "tags_token_2022" BOOLEAN NOT NULL,
    "tags_verified" BOOLEAN NOT NULL,
    "freeze_authority" TEXT,
    "mint_authority" TEXT,
    "minted_at" TIMESTAMP(3),
    "permanent_delegate" TEXT,
    "extensions" JSONB,

    CONSTRAINT "tokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "token_price" (
    "id" SERIAL NOT NULL,
    "address" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,
    "price_usdc" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fetched_ts" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "token_price_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transaction" (
    "id" SERIAL NOT NULL,
    "user_address" TEXT NOT NULL,
    "transaction_ts" TIMESTAMP(3) NOT NULL,
    "type" TEXT NOT NULL,
    "token_address" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "amount_token" INTEGER NOT NULL,
    "amount_sol" INTEGER NOT NULL,
    "amount_usdc" INTEGER NOT NULL,
    "quantity_holding" INTEGER NOT NULL,
    "sold_from" JSONB NOT NULL,
    "profit_loss" INTEGER NOT NULL,
    "status" "Status" NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tokens_address_key" ON "tokens"("address");

-- CreateIndex
CREATE UNIQUE INDEX "token_price_address_key" ON "token_price"("address");
