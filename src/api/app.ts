import Fastify from "fastify"
import { APIAppConfig } from "api/config"
import { APIAppDependencies } from "api/dependencies"
import { getStoreRoutes } from "api/store/routes"
import { buildMainPlugin } from "./shared/plugin/shared-plugin"

export class APIApp {
  readonly dependencies: APIAppDependencies
  readonly config: APIAppConfig

  constructor(dependencies: APIAppDependencies, config: APIAppConfig) {
    this.dependencies = dependencies
    this.config = config
  }

  async run() {
    const main = buildMainPlugin(this.dependencies)
    main.register(getStoreRoutes(this.dependencies), { prefix: "/stores" })
    await main.listen(this.config.port, "0.0.0.0")
  }
}
