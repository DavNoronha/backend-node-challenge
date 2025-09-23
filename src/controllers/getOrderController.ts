import { FastifyRequest, FastifyReply } from "fastify"
import { getOrderService } from "../services/getOrderService.js"

export async function getOrderController(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string }
  const order = await getOrderService(id)
  return reply.send(order)
}