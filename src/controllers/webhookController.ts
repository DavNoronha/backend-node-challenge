import { FastifyRequest, FastifyReply } from "fastify"
import { webhookService } from "../services/webhookService.js"
import { stripe } from "../lib/stripe.js"

export async function webhookController(request: FastifyRequest, reply: FastifyReply) {
  const sig = request.headers["stripe-signature"] as string

  if (!sig) {
    return reply.status(400).send("Missing Stripe signature header")
  }

  let event

  try {
    const rawBody = request.rawBody instanceof Buffer
      ? request.rawBody
      : Buffer.from(request.rawBody)

    event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET as string
    )
  } catch (err: any) {
    console.error("Webhook signature verification failed.", err.message)
    return reply.status(400).send(`Webhook Error: ${err.message}`)
  }

  const result = await webhookService(event)
  return reply.status(200).send({ received: true, result })
}
