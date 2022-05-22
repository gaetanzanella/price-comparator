import { logger } from "common/logger"
import { Knex, knex } from "knex"
import path from "path"

export type DatabaseConfiguration = {
  client: string
  connection: {
    host: string
    port: number
    user: string
    password: string
    database: string
  }
}

export class DatabaseInstance {
  readonly knex: Knex

  constructor(config: DatabaseConfiguration) {
    this.knex = knex({
      client: config.client,
      connection: config.connection,
    })
  }

  async applyMigrations() {
    const migrations = path.resolve(__dirname, "migrations")
    await this.knex.migrate.latest({ directory: migrations }).catch((reason) => {
      logger.fatal("Unable to migrate DB", reason)
    })
  }
}
