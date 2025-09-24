import Stripe from "stripe"
import { prisma } from "../lib/prisma.js"
import { sendGiftEmail } from "./emailService.js"

export async function webhookService(event: Stripe.Event) {
  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object

      if (session.payment_status !== "paid") {
        throw new Error("Payment not completed")
      }

      const orderId = session.metadata?.orderId

      if (!orderId) {
        throw new Error("OrderId not found in session metadata")
      }

      const existingOrder = await prisma.order.findUnique({
        where: { id: orderId },
      })

      if (!existingOrder) {
        throw new Error(`Order not found: ${orderId}`)
      }

      if (existingOrder.status === "PAID") {
        console.log(`Order ${orderId} already processed`)
        return existingOrder
      }

      const shareLink = session.metadata?.purchaseFor === "gift"
        ? `${process.env.FRONTEND_URL}/your-gift/${orderId}`
        : undefined

      const updatedOrder = await prisma.order.update({
        where: { id: orderId },
        data: {
          status: "PAID",
          updatedAt: new Date(),
          ...(shareLink ? { shareLink } : {}),
        },
      })

      if (session.metadata?.purchaseFor === "gift" && session.metadata?.recipientEmail) {
        await sendGiftEmail(
          session.metadata.recipientEmail,
          session.metadata.message || "",
          shareLink!
        )
      }

      return updatedOrder
    }

    case "payment_intent.payment_failed": {
      const paymentIntent = event.data.object as Stripe.PaymentIntent
      console.error(`Payment failed for ${paymentIntent.id}`)
      break
    }
    default:
      console.log(`Unhandled event type: ${event.type}`)
      break
  }
}
