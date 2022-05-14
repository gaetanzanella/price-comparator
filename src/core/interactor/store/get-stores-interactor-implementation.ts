import { Store } from "core/models/store"
import { StoreRepository } from "core/repository/store/store-repository"
import { GetStoresInteractor } from "core/interactor/store/get-stores-interactor"

export class GetStoresInteractorImplementation implements GetStoresInteractor {
  constructor(private storeRepository: StoreRepository) {}

  async execute(): Promise<Store[]> {
    return await this.storeRepository.getStores()
  }
}
