import { FastifyRequest, FastifyReply } from "fastify"
import { createOrderService, CreateOrderProps } from "../services/createOrderService.js"

export async function createOrderController(request: FastifyRequest, reply: FastifyReply) {
  const data = request.body as CreateOrderProps
  const order = await createOrderService(data)
  return reply.send(order)
}