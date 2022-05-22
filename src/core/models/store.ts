import { ID } from "./id"

export type StoreID = ID<Store, number>

export type Store = {
  id: StoreID
  name: string
}
