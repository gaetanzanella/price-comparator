import { FastifyPluginAsync } from "fastify"

const routes: FastifyPluginAsync = async function (fastify, options) {
  fastify.get("/", (req, rep) => {
    rep.status(200).send("Hello")
  })
}

export default routes
