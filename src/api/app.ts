import Fastify from "fastify"
import { APIAppConfig } from "./config"
import { APIAppDependencies } from "./dependencies"
import StoreRoutes from "./stores/routes"

export class APIApp {
  readonly dependencies: APIAppDependencies
  readonly config: APIAppConfig

  constructor(dependencies: APIAppDependencies, config: APIAppConfig) {
    this.dependencies = dependencies
    this.config = config
  }

  async run() {
    const fastify = Fastify({
      logger: true,
    })
    fastify.register(StoreRoutes, { prefix: "/stores" })
    await fastify.listen(this.config.port, "0.0.0.0")
  }
}
