import { ID } from "./id"

export type StoreID = ID<Store, String>

export type Store = {
  id: StoreID
  name: String
}
