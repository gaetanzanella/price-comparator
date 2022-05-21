import * as log4js from "log4js"

export type LoggerConfiguration = {
  level: string
  module: string
  version: string
}

class Logger {
  #isConfigured = false
  #logger: log4js.Logger

  constructor() {
    this.#logger = log4js.getLogger()
  }

  trace(message: any, ...args: any[]): void {
    this.#logger.trace(message, args)
  }

  debug(message: any, ...args: any[]): void {
    this.#logger.debug(message, args)
  }

  info(message: any, ...args: any[]): void {
    this.#logger.info(message, args)
  }

  warn(message: any, ...args: any[]): void {
    this.#logger.warn(message, args)
  }

  error(message: any, ...args: any[]): void {
    this.#logger.error(message, args)
  }

  fatal(message: any, ...args: any[]): void {
    this.#logger.fatal(message, args)
  }

  mark(message: any, ...args: any[]): void {
    this.#logger.mark(message, args)
  }

  _configure(config: LoggerConfiguration) {
    if (this.#isConfigured) {
      this.fatal("Logger already is configured")
      return
    }
    log4js.addLayout("logstash", () => (logEvent) => {
      return JSON.stringify({
        "@version": "1.0.0",
        "@timestamp": logEvent.startTime,
        module: config.module,
        module_version: config.version,
        level: logEvent.level.levelStr,
        message: this.format(logEvent.data[0]),
        mparam: { ...logEvent.data.slice(1).map(this.format) },
      })
    })
    log4js.configure({
      appenders: {
        out: { type: "stderr", layout: { type: "logstash" } },
      },
      categories: {
        default: { appenders: ["out"], level: config.level },
      },
    })
    this.#isConfigured = true
  }

  private format(obj: unknown): string {
    if (typeof obj === "string") {
      return obj
    }
    if (obj instanceof Error) {
      // JSON.stringify doesn't keep the stack
      return JSON.stringify({ message: obj.message, name: obj.name, stack: obj.stack })
    }
    return JSON.stringify(obj)
  }
}

const logger = new Logger()

export { logger }
