import { FastifyRequest, FastifyReply } from "fastify"
import { WebhookService } from "../services/webhookService.js"
import { stripe } from "../lib/stripe.js"

class WebhookController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
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

    const webhookService = new WebhookService()
    const result = await webhookService.handle(event)

    return reply.status(200).send({ received: true, result })
  }
}

export { WebhookController }
