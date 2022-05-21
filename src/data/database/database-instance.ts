import { Knex, knex } from "knex"

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

  applyMigrations() {}
}
