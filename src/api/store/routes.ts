import { APIAppDependencies } from "api/dependencies"
import { FastifyPluginAsync } from "fastify"
import { StoreController } from "api/store/controller"
import {
  RESTStoreListSchema,
  RESTStoreList,
  RESTStore,
  RESTStoreSchema,
  RESTStoreForm,
  RESTStoreFormSchema,
} from "api/store/model/rest-store"
import { RESTEmpty, RESTEmptySchema } from "api/shared/model/rest-empty"

export function getStoreRoutes(dependencies: APIAppDependencies): FastifyPluginAsync {
  const controller = new StoreController(
    dependencies.getStoresInteractor(),
    dependencies.createStoreInteractor()
  )

  return async function (fastify) {
    fastify.get<{ Reply: RESTStoreList }>(
      "/",
      {
        schema: {
          response: {
            200: RESTStoreListSchema,
          },
        },
      },
      async (req, rep) => {
        await rep.sendResponse(controller.getStores())
      }
    )

    fastify.post<{ Body: RESTStoreForm; Reply: RESTEmpty }>(
      "/",
      {
        schema: {
          body: RESTStoreFormSchema,
          response: {
            201: RESTEmptySchema,
          },
        },
      },
      async (req, rep) => {
        await rep.sendResponse(controller.createStore(req.body))
      }
    )
  }
}
