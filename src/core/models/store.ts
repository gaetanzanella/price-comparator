import { ID } from "./id"

export type StoreID = ID<Store, string>

export type Store = {
  id: StoreID
  name: string
}
