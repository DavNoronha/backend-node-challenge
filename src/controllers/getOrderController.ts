import { FastifyRequest, FastifyReply } from "fastify"
import { GetOrderService } from "../services/getOrderService.js"

class GetOrderController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string }

    const getOrderService = new GetOrderService()

    const order = await getOrderService.execute(id)

    return reply.send(order)
  }
}

export { GetOrderController }