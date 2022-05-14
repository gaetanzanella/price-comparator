import { Store } from "core/models/store"
import { StoreRepository } from "core/repository/store/store-repository"

export class StoreRepositoryImplementation implements StoreRepository {
  getStores(): Promise<Store[]> {
    return Promise.resolve([
      {
        id: { id: "1" },
        name: "Hello"
      }
    ])
  }
}
