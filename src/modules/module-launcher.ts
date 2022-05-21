import { Configuration } from "config/configuration"
import { ConfigurationModule } from "./configuration-module"
import { DatabaseModule } from "./database-module"
import { LoggerModule } from "./logger-module"

export type ModuleLaunchResult = {
  config: Configuration
}

export class ModuleLauncher {
  #logger: LoggerModule
  #database: DatabaseModule
  #configuration: ConfigurationModule

  constructor(logger: LoggerModule, database: DatabaseModule, configuration: ConfigurationModule) {
    this.#logger = logger
    this.#database = database
    this.#configuration = configuration
  }

  async launch(): Promise<ModuleLaunchResult> {
    const config = this.#configuration.start()
    await this.#logger.start(config)
    await this.#database.start()
    return {
      config: config,
    }
  }
}
