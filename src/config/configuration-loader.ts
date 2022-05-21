import { Configuration } from "./configuration"
import * as dotenv from "dotenv"

export type ProcessConfigurationOrigin = { type: "process-env" }
export type DotEnvConfigurationOrigin = { type: "dot-env"; path: string }
export type ConfigurationOrigin = DotEnvConfigurationOrigin | ProcessConfigurationOrigin

function isDotEnvConfigurationOrigin(
  origin: ConfigurationOrigin
): origin is DotEnvConfigurationOrigin {
  return origin.type == "dot-env"
}

export class ConfigurationLoader {
  constructor() {}

  loadConfiguration(origin: ConfigurationOrigin): Configuration {
    if (isDotEnvConfigurationOrigin(origin)) {
      dotenv.config({ path: origin.path })
    } else {
      // nothing to do
    }
    const env = process.env
    return {
      env: this.parseString(env, "NODE_ENV"),
      service: {
        name: this.parseString(env, "SERVICE_NAME"),
        version: this.parseString(env, "SERVICE_VERSION"),
      },
      logger: {
        level: this.parseString(env, "LOGGER_LEVEL"),
      },
      database: {
        client: this.parseString(env, "DB_CLIENT"),
        connection: {
          host: this.parseString(env, "DB_CONNECTION_HOST"),
          port: this.parseInt(env, "DB_CONNECTION_PORT"),
          user: this.parseString(env, "DB_CONNECTION_USER"),
          password: this.parseString(env, "DB_CONNECTION_PASSWORD"),
          database: this.parseString(env, "DB_CONNECTION_DATABASE"),
        },
      },
    }
  }

  private parseInt(config: any, key: string): number {
    return this.parse(config, key, (value) => {
      return parseInt(value, 10)
    })
  }

  private parseString(config: any, key: string): string {
    return this.parse(config, key, (value) => {
      return value
    })
  }

  private parse<T>(config: any, key: string, map: (value: string) => T | undefined): T {
    const value = config[key]
    if (value === undefined) {
      throw new Error(`Invalid configuration: failed to parse ${key}`)
    }
    const result = map(value)
    if (result === undefined) {
      throw new Error(`Invalid configuration: failed to parse ${key}`)
    }
    return result
  }
}
