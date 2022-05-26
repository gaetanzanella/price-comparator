import { CreateStoreInteractor } from "core/interactor/store/create-store-interactor"
import { GetStoresInteractor } from "core/interactor/store/get-stores-interactor"

export interface APIAppDependencies {
  getStoresInteractor: () => GetStoresInteractor
  createStoreInteractor: () => CreateStoreInteractor
}
