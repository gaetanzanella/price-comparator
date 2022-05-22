import { Store } from "core/models/store"
import { StoreRepository } from "core/repository/store/store-repository"
import { DatabaseInstance } from "data/database/database-instance"
import { StoreMapper } from "data/repository/store/mapper/store-mapper"
import { StoreRow, storeSchema } from "data/database/resource/store-row"

export class StoreRepositoryImplementation implements StoreRepository {
  #database: DatabaseInstance

  constructor(database: DatabaseInstance) {
    this.#database = database
  }

  async getStores(): Promise<Store[]> {
    const rows = await this.#database
      .knex<StoreRow>(storeSchema.tableName)
      .orderBy(storeSchema.column("uuid"))
    const mapper = new StoreMapper()
    return rows.map((row: StoreRow) => {
      return mapper.map(row)
    })
  }
}
