import { prisma } from "../lib/prisma.js"
import { stripe } from "../lib/stripe.js"

export interface CreateOrderProps {
  purchaseFor: "self" | "gift"
  recipientEmail?: string
  message?: string
  senderName?: string
  recipientName?: string
  price: number
}

export async function createOrderService({ purchaseFor, recipientEmail, message, price, senderName, recipientName }: CreateOrderProps) {
  const redeemCode = Math.random().toString(36).substring(2, 10).toUpperCase()

  const order = await prisma.order.create({
    data: {
      purchaseFor,
      status: "PENDING",
      redeemCode,
      recipientEmail: recipientEmail || null,
      message: message || null,
      senderName: senderName || null,
      recipientName: recipientName || null,
      price
    },
  })

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "Gift Card",
            description:
              purchaseFor === "gift"
                ? "Gift Card (as a gift)"
                : "Gift Card (for yourself)",
          },
          unit_amount: order.price, // Cents
        },
        quantity: 1,
      },
    ],
    metadata: {
      orderId: order.id,
      message: order.message,
      purchaseFor: order.purchaseFor,
      recipientEmail: order.recipientEmail
    },
    success_url: `${process.env.FRONTEND_URL}/my-orders/${order.id}`,
    cancel_url: `${process.env.FRONTEND_URL}/cancel`,
  })

  return { checkoutUrl: session.url }
}