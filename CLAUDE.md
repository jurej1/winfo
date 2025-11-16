# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a cryptocurrency wallet information and trading platform built with SST v3 (Serverless Stack) on AWS. The application integrates with multiple blockchain data providers (Moralis, CoinGecko, 1inch, 0x) to provide wallet analytics, token information, NFT data, and DEX swap functionality.

## Architecture

### Monorepo Structure (npm Workspaces)

This is an npm workspaces monorepo with the following packages:

- **packages/web** - Next.js 15 frontend (React 19) deployed as static site to AWS
- **packages/functions** - AWS Lambda function handlers (API Gateway endpoints)
- **packages/core** - Shared business logic and external API integrations (Moralis, CoinGecko, 1inch, 0x, Uniswap)
- **packages/db** - Drizzle ORM schemas and queries for Neon PostgreSQL database
- **packages/types** - Shared TypeScript type definitions
- **packages/scripts** - Administrative scripts run via `sst shell tsx`

Note: `packages/web` is excluded from workspaces (see root package.json) to isolate its dependencies.

### Infrastructure (SST v3)

Infrastructure is defined in `infra/` directory:
- `api.ts` - API Gateway V2 routes (REST API for all endpoints)
- `web.ts` - StaticSite for Next.js app
- `secrets.ts` - Secret definitions (API keys for external services)
- `cron.ts` - Scheduled jobs (wallet net worth updates)
- `index.ts` - Exports all infrastructure modules

All resources are deployed to AWS region `eu-central-1`.

### External API Integrations

The application integrates with multiple blockchain/crypto data providers:

- **Moralis** - Wallet data (balances, transactions, NFTs, approvals)
- **CoinGecko** - Token market data, prices, OHLC charts
- **1inch** - Limit orders creation and management
- **0x** - DEX swap quotes and transactions
- **Uniswap** - DEX swap functionality

All integrations are abstracted in `packages/core/src/` with repository pattern.

### Database

- **Database**: Neon PostgreSQL (serverless Postgres)
- **ORM**: Drizzle ORM
- **Schema location**: `packages/db/src/schemas/`
- **Migrations**: `packages/db/migrations/`
- **Queries**: `packages/db/src/queries/`

Database credentials are stored as SST secrets and accessed via `databaseUrl` secret.

### Lambda Functions

Functions use Middy middleware for:
- CORS handling (`@middy/http-cors`)
- Error handling (`@middy/http-error-handler`)
- Response serialization (`@middy/http-response-serializer`)
- Request validation (`@middy/validator`)
- Content encoding (`@middy/http-content-encoding`)

Functions are organized by domain: `tokens/`, `wallet/`, `swap/`, `nfts/`, `limit-orders/`.

### Frontend Architecture

- **Framework**: Next.js 15 with App Router
- **React**: Version 19
- **Build**: Turbopack (`--turbopack` flag in dev and build)
- **Output**: Static export (`output: "export"`)
- **UI Components**: Radix UI primitives + custom components
- **Styling**: Tailwind CSS v4
- **Web3**: wagmi + viem + RainbowKit for wallet connections
- **State**: Zustand for global state
- **Charts**: Recharts and Syncfusion EJ2 Charts

The Next.js app receives the API URL via `NEXT_PUBLIC_API_URL` environment variable injected by SST.

## Development Commands

### Setup

```bash
npm install
```

### SST Deployment

```bash
# Deploy to default (dev) stage
npx sst deploy

# Deploy to specific stage
npx sst deploy --stage production
```

### Web Development

```bash
# Navigate to web package
cd packages/web

# Start Next.js dev server with Turbopack
npm run dev

# Build for production
npm run build

# Run linter
npm run lint
```

### Database Operations

```bash
# Navigate to db package
cd packages/db

# Generate migrations from schema changes
npm run db:generate

# Run migrations
npm run db:migrate
```

### Testing

```bash
# Run core package tests (uses Vitest with sst shell)
cd packages/core
npm test
```

### Running Scripts

```bash
# Navigate to scripts package
cd packages/scripts

# Execute a script with SST context
npm run shell src/example.ts
```

## Key Implementation Details

### API Routes Pattern

All API routes are defined in `infra/api.ts` with consistent pattern:
- Handler path: `packages/functions/src/{domain}/{action}/{method}.handler`
- All routes link to secrets array for access to external API keys
- Example: `GET /tokens/price` → `packages/functions/src/tokens/price/get.handler`

### Lambda Function Structure

Each Lambda handler should:
1. Use Middy middleware wrapper (defined in `@w-info-sst/core`)
2. Validate inputs using `@middy/validator`
3. Return properly structured responses (serialized by middleware)
4. Use repository pattern to access external APIs from `@w-info-sst/core`

### Database Schema Pattern

- Schemas located in `packages/db/src/schemas/**/*.sql.ts`
- Use Drizzle ORM syntax
- Export types from `packages/db/src/types/`
- Queries abstracted in `packages/db/src/queries/`

### Secret Management

Secrets are defined in `infra/secrets.ts` and accessed in functions via SST Resource:

```typescript
import { Resource } from "sst";
const apiKey = Resource.MoralisAPIKey.value;
```

Required secrets:
- `MoralisAPIKey`
- `CoinAPIKey`
- `CoinGeckoAPIKey`
- `DatabaseUrl`
- `ZeroXApiKey`
- `ReownProjectID`
- `OneInchAPIKey`

### Package Dependencies

Packages reference each other using workspace protocol:
- Import from `@w-info-sst/core`, `@w-info-sst/db`, `@w-info-sst/types`
- Core exports integrations: Moralis, CoinGecko, 0x, Uniswap, 1inch
- Types package provides shared interfaces for API responses

## Environment Setup

The web application requires these environment variables (automatically injected by SST):
- `NEXT_PUBLIC_API_URL` - API Gateway URL
- `NEXT_PUBLIC_REOWN_PROJECT_ID` - Reown/WalletConnect project ID
