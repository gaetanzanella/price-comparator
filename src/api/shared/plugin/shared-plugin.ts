import { isSuccess, RESTResponse, RESTSuccessResponse } from "api/shared/model/rest-response"
import { FastifyInstance, FastifyReply } from "fastify"
import Fastify from "fastify"
import { APIAppDependencies } from "api/dependencies"

declare module "fastify" {
  interface FastifyReply {
    hello(): void
    sendResponse<S>(response: Promise<RESTResponse<S>>): FastifyReply
  }
}

export function buildMainPlugin(dependencies: APIAppDependencies): FastifyInstance {
  const fastify = Fastify({
    logger: true,
  })
  fastify.decorateReply("sendResponse", async function (promise: Promise<RESTResponse<any>>) {
    try {
      const response = await promise
      if (isSuccess(response)) {
        this.status(200).send(response.content)
      } else {
        this.status(404)
      }
    } catch {
      this.status(500).send()
    }
  })
  return fastify
}
