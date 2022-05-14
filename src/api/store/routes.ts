import { APIAppDependencies } from "api/dependencies"
import { FastifyPluginAsync } from "fastify"
import { StoreController } from "api/store/controller"
import { RESTStoreList, RESTStoreListType } from "api/store/model/rest-store"

export function getStoreRoutes(dependencies: APIAppDependencies): FastifyPluginAsync {
  const controller = new StoreController(dependencies.getStoresInteractor())

  return async function (fastify) {
    fastify.get<{ Reply: RESTStoreListType }>(
      "/",
      {
        schema: {
          response: {
            200: RESTStoreList,
          },
        },
      },
      async (req, rep) => {
        rep.sendResponse(controller.getStores())
      }
    )
  }
}
