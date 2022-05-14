import { APIAppDependencies } from "api/dependencies"
import { GetStoresInteractorImplementation } from "core/interactor/store/get-stores-interactor-implementation"
import { StoreRepositoryImplementation } from "data/repository/store/store-repository-implementation"

export function buildAPIAppDependencies(): APIAppDependencies {
  const storeRepository = new StoreRepositoryImplementation()

  return {
    getStoresInteractor: () => {
      return new GetStoresInteractorImplementation(storeRepository)
    },
  }
}
