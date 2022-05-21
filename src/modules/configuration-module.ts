import { Configuration } from "config/configuration"
import { ConfigurationLoader } from "config/configuration-loader"
import { readFileSync } from "fs"
import path from "path"

export class ConfigurationModule {
  #process: NodeJS.Process

  constructor(process: NodeJS.Process) {
    this.#process = process
  }

  start(): Configuration {
    const rootFolder = path.resolve(__dirname, "../..")
    const packageJson = JSON.parse(readFileSync(path.resolve(rootFolder, "package.json"), "utf-8"))
    this.#process.env.SERVICE_VERSION = packageJson.version // will be used by the configuration loader
    if (this.#process.env.NODE_ENV == "production") {
      return new ConfigurationLoader().loadConfiguration({ type: "process-env" })
    } else {
      this.#process.env.NODE_ENV = "debug"
      return new ConfigurationLoader().loadConfiguration({
        type: "dot-env",
        path: path.resolve(rootFolder, ".env"),
      })
    }
  }
}
