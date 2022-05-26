import { Store } from "core/models/store"
import { StoreForm } from "core/models/store-form"

export interface StoreRepository {
  getStores(): Promise<Store[]>
  createStore(form: StoreForm): Promise<void>
}
