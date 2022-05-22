import {
  RESTResponse,
  RESTFailureResponse,
  RESTSuccessResponse,
} from "api/shared/model/rest-response"
import { RESTStoreListType } from "api/store/model/rest-store"
import { GetStoresInteractor } from "core/interactor/store/get-stores-interactor"
import { RESTStoreListMapper } from "./model/mapper/rest-store-mapper"

export class StoreController {
  #getStoresInteractor: GetStoresInteractor

  constructor(private getStoresInteractor: GetStoresInteractor) {
    this.#getStoresInteractor = getStoresInteractor
  }

  async getStores(): Promise<RESTResponse<RESTStoreListType>> {
    try {
      const stores = await this.#getStoresInteractor.execute()
      const mapper = new RESTStoreListMapper()
      return {
        state: "success",
        content: mapper.map(stores),
      }
    } catch (error) {
      return { state: "failure", error: error }
    }
  }
}
