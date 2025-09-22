import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from "fastify"

import { GetOrderController } from "./controllers/getOrderController.js"
import { CreateOrderController } from "./controllers/createOrderController.js"
import { WebhookController } from "./controllers/webhookController.js"

export async function routes(fastify: FastifyInstance, options: FastifyPluginOptions) {

 fastify.get("/order/:id", async (request: FastifyRequest, reply: FastifyReply) => {
   return new GetOrderController().handle(request, reply)
 })

 fastify.post("/order", async (request: FastifyRequest, reply: FastifyReply) => {
   return new CreateOrderController().handle(request, reply)
 })

  fastify.post("/webhook", {
    config: {
      rawBody: true,
    },
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      return new WebhookController().handle(request, reply)
    }
  })

}
