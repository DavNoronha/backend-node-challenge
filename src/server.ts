import Fastify from "fastify"
import cors from "@fastify/cors"

import { routes } from "./routes.js"

const app = Fastify({ logger: true })

app.addContentTypeParser("application/json", { parseAs: "buffer" }, function (req, body, done) {
  (req as any).rawBody = body
  try {
    const json = JSON.parse(body.toString())
    done(null, json)
  } catch (err) {
    done(err as Error, undefined)
  }
})

const port = +process.env.PORT! || 3002

const start = async () => {
  await app.register(cors)
  await app.register(routes)

  try {
    await app.listen({ port })
  } catch (err) {
    console.log("SERVER: ",err)
    process.exit(1)
  }
}

start()
