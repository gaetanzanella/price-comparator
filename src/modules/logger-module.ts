import { logger } from "common/logger"
import { Configuration } from "config/configuration"

export class LoggerModule {
  constructor() {}

  async start(config: Configuration) {
    logger._configure({
      level: config.logger.level,
      module: config.service.name,
      version: config.service.version,
    })
  }
}
