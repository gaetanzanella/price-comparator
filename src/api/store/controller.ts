import { RESTEmpty } from "api/shared/model/rest-empty"
import {
  RESTResponse,
  RESTFailureResponse,
  RESTSuccessResponse,
} from "api/shared/model/rest-response"
import { RESTStore, RESTStoreForm, RESTStoreList } from "api/store/model/rest-store"
import { CreateStoreInteractor } from "core/interactor/store/create-store-interactor"
import { GetStoresInteractor } from "core/interactor/store/get-stores-interactor"
import { RESTStoreListMapper } from "./model/mapper/rest-store-mapper"

export class StoreController {
  constructor(
    private getStoresInteractor: GetStoresInteractor,
    private createStoreInteractor: CreateStoreInteractor
  ) {}

  async getStores(): Promise<RESTResponse<RESTStoreList>> {
    try {
      const stores = await this.getStoresInteractor.execute()
      const mapper = new RESTStoreListMapper()
      return {
        state: "success",
        content: mapper.map(stores),
      }
    } catch (error) {
      return { state: "failure", error: error }
    }
  }

  async createStore(form: RESTStoreForm): Promise<RESTResponse<RESTEmpty>> {
    try {
      await this.createStoreInteractor.execute({ name: form.name })
      return {
        state: "success",
        content: null,
      }
    } catch (error) {
      return { state: "failure", error: error }
    }
  }
}
