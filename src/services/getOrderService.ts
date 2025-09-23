import { prisma } from "../lib/prisma.js"

export async function getOrderService(id: string) {
  const order = await prisma.order.findUnique({ where: { id } })

  if (!order) {
    throw new Error(`Order not found: ${id}`)
  }

  return order
}
