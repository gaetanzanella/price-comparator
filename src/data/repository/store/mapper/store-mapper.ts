import { Store, StoreID } from "core/models/store"
import { StoreRow } from "data/database/resource/store-row"

export class StoreMapper {
  map(store: StoreRow): Store {
    return {
      id: { id: store.uuid },
      name: store.name,
    }
  }
}
