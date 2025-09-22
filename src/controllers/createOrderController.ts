import { FastifyRequest, FastifyReply } from "fastify"
import { CreateOrderService } from "../services/createOrderService.js"

class CreateOrderController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const data = request.body as {
      purchaseFor: "self" | "gift",
      recipientEmail: string,
      message: string,
      recipientName: string,
      senderName: string,
      price: number
    }

    const createOrderService = new CreateOrderService()

    const order = await createOrderService.execute(data)

    return reply.send(order)
  }
}

export { CreateOrderController }