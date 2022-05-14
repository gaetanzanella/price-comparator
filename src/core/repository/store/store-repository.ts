import { Store } from "core/models/store"

export interface StoreRepository {
  getStores(): Promise<Store[]>
}
