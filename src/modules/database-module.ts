import { Configuration } from "config/configuration"
import { DatabaseInstance } from "data/database/database-instance"

export class DatabaseModule {
  constructor() {}

  async start(config: Configuration): Promise<DatabaseInstance> {
    const instance = new DatabaseInstance(config.database)
    instance.applyMigrations()
    return instance
  }
}
