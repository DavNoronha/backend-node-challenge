import { FastifyInstance, FastifyPluginOptions } from "fastify"

import { getOrderController } from "./controllers/getOrderController.js"
import { createOrderController } from "./controllers/createOrderController.js"
import { webhookController } from "./controllers/webhookController.js"

export async function routes(fastify: FastifyInstance, options: FastifyPluginOptions) {

 fastify.get("/order/:id", getOrderController)

 fastify.post("/order", createOrderController)

 fastify.post("/webhook", {
   config: {
     rawBody: true,
   },
   handler: webhookController
 })

}
