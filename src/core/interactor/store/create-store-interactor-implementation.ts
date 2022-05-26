import { Store } from "core/models/store"
import { StoreRepository } from "core/repository/store/store-repository"
import { CreateStoreInteractor } from "core/interactor/store/create-store-interactor"
import { StoreForm } from "core/models/store-form"

export class CreateStoreInteractorImplementation implements CreateStoreInteractor {
  constructor(private storeRepository: StoreRepository) {}

  async execute(form: StoreForm): Promise<void> {
    return await this.storeRepository.createStore(form)
  }
}
