import { Store } from "core/models/store"

export interface GetStoresInteractor {
  execute(): Promise<Store[]>
}
