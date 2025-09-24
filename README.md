# Gift cards checkout backend

## To create STRIPE_WEBHOOK_SECRET you have:
- install stripe cli: https://docs.stripe.com/stripe-cli/install?install-method=windows
- login to stripe: (cmd) stripe login
- start webhook: (cmd) stripe listen --forward-to localhost:3001/webhook

## Run
```bash
npm install
# and
npm run dev
```
