import { GetStoresInteractor } from "core/interactor/store/get-stores-interactor"

export interface APIAppDependencies {
  getStoresInteractor: () => GetStoresInteractor
}
