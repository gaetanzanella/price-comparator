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
    const response = await promise
    if (isSuccess(response)) {
      if (response.content === null || response.content === undefined) {
        this.status(204)
      } else {
        this.status(200).send(response.content)
      }
    } else {
      throw response.error
    }
  })
  return fastify
}
