import { Store } from "core/models/store"
import { StoreRepository } from "core/repository/store/store-repository"
import { DatabaseInstance } from "data/database/database-instance"
import { StoreMapper } from "data/repository/store/mapper/store-mapper"
import { StoreRow, StoreRowInsert, storeSchema } from "data/database/resource/store-row"
import { StoreForm } from "core/models/store-form"
import { randomUUID } from "crypto"

export class StoreRepositoryImplementation implements StoreRepository {
  #database: DatabaseInstance

  constructor(database: DatabaseInstance) {
    this.#database = database
  }

  async getStores(): Promise<Store[]> {
    const rows = await this.#database
      .knex<StoreRow>(storeSchema.tableName)
      .orderBy(storeSchema.column("id"))
    const mapper = new StoreMapper()
    return rows.map((row: StoreRow) => {
      return mapper.map(row)
    })
  }

  async createStore(form: StoreForm): Promise<void> {
    const row: StoreRowInsert = { id: randomUUID(), name: form.name }
    await this.#database.knex<StoreRow>(storeSchema.tableName).insert(row)
  }
}
