This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## ICICI Payment Gateway Integration (Standard Redirect Flow)

### Architecture summary
- Registration success redirects to `/payment/checkout` where user selects a plan and starts payment.
- Payment initiation happens at `/api/payments/icici/initiate` (server only).
- Server computes secure hash and calls ICICI initiate sale API.
- User browser is redirected to `redirectURI + tranCtx` from ICICI.
- ICICI browser callback hits `/api/payments/icici/callback`.
- ICICI payment advice (S2S) hits `/api/payments/icici/advice`.
- Final state is read from backend via `/api/txn/status/:merchantTxnNo` (alias of payment status endpoint to avoid browser blocker false positives) on `/payment/status` page.
- Reconciliation service (`src/lib/payments/icici/reconciliation.js`) handles missed callbacks and uncertain states.

### Important assumptions to confirm with ICICI onboarding
1. Exact hash field order and hashing algorithm/version for each API.
2. Whether secure hash is sent in request body (`secureHash`) or HTTP header for each endpoint.
3. Exact transaction status endpoint path and response field names in UAT vs PROD.
4. Response code mapping table (success/pending/failure/cancelled) for your MID.

### Setup steps
1. Copy `.env.example` to `.env.local` and fill all ICICI values.
2. Ensure callback/advice URLs are publicly accessible from ICICI.
3. Run app with `npm run dev`.
4. Complete user registration, choose plan in checkout, click **Pay Now**.

### Database-ready model suggestion (Prisma)
```prisma
model PaymentAttempt {
  id                 String   @id @default(cuid())
  merchantTxnNo      String   @unique
  orderId            String
  registrationId     String
  planId             String
  amountPaise        Int
  customerName       String
  customerEmail      String
  customerMobile     String
  state              String
  gatewayTxnRef      String?
  gatewayResponseCode String?
  gatewayResponseMessage String?
  redirectUrl        String?
  rawInitiateRequest Json?
  rawInitiateResponse Json?
  rawCallbackPayload Json?
  rawAdvicePayload   Json?
  reconciledAt       DateTime?
  metadata           Json?
  createdAt          DateTime @default(now())
  updatedAt          DateTime @updatedAt
}
```

### Status mapping notes
Current code maps common gateway values to internal states:
- SUCCESS: `0, 00, SUCCESS, S, CAPTURED`
- PENDING: `PENDING, P, 1, 01, PROCESSING`
- FAILED: `FAILED, F, 2, 02, DECLINED, REJECTED`
- CANCELLED: `CANCELLED, C, 3, 03, USER_CANCELLED`

### Reconciliation design
- Run `reconcileIciciPayments(limit)` from scheduled job.
- Picks `INITIATED/REDIRECTED/PENDING/RECONCILING` attempts.
- Calls transaction status API and transitions state idempotently.
- Recommended schedule:
  - every 5 minutes for first 30 minutes,
  - every 30 minutes for 24 hours,
  - daily for 3 days.

### Test strategy checklist
- Unit: hash sign/verify and constant-time compare.
- Unit: state machine valid/invalid transitions.
- Integration: initiate success with redirectURI/tranCtx present.
- Integration: callback hash mismatch returns failure path.
- Integration: duplicate callback/advice remains idempotent.
- Integration: advice-before-callback still leads to correct final state.
- Integration: timeout/network error handling for initiate/status.
- E2E: registration -> plan selection -> ICICI redirect -> status page.
