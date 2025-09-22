# Gift cards checkout backend

## In order to test this app you'll have to:
### - Create .env file with:
  PORT=3001

  #db

  DATABASE_URL=your mongodb connection string

  #stripe

  STRIPE_SECRET_KEY=your secret key

  STRIPE_WEBHOOK_SECRET=see next topic

  #nodemailer

  SMTP_HOST=smtp.gmail.com

  SMTP_PORT=587

  SMTP_USER=your_email@gmail.com

  SMTP_PASS=your gmail app password #https://support.google.com/accounts/answer/185833?hl=pt-BR

  FRONTEND_URL=http://localhost:3000


# To create STRIPE_WEBHOOK_SECRET you have:
- install stripe cli: https://docs.stripe.com/stripe-cli/install?install-method=windows
- login to stripe: (cmd) stripe login
- start webhook: (cmd) stripe listen --forward-to localhost:3001/webhook

# Run
```bash
npm install
# and
npm run dev
```
