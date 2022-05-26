import { APIAppDependencies } from "api/dependencies"
import { ModuleLauncher, ModuleLaunchResult } from "modules/module-launcher"
import { GetStoresInteractorImplementation } from "core/interactor/store/get-stores-interactor-implementation"
import { StoreRepositoryImplementation } from "data/repository/store/store-repository-implementation"
import { LoggerModule } from "modules/logger-module"
import { DatabaseModule } from "modules/database-module"
import { ConfigurationModule } from "modules/configuration-module"
import { CreateStoreInteractorImplementation } from "core/interactor/store/create-store-interactor-implementation"

export class DependencyProvider {
  constructor() {}

  buildApiAppDependencies(result: ModuleLaunchResult): APIAppDependencies {
    const storeRepository = new StoreRepositoryImplementation(result.database)
    return {
      getStoresInteractor: () => {
        return new GetStoresInteractorImplementation(storeRepository)
      },
      createStoreInteractor: () => {
        return new CreateStoreInteractorImplementation(storeRepository)
      },
    }
  }

  buildModuleLauncher(): ModuleLauncher {
    return new ModuleLauncher(
      new LoggerModule(),
      new DatabaseModule(),
      new ConfigurationModule(process)
    )
  }
}
