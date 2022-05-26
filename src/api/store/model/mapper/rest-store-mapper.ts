import { Store } from "core/models/store"
import { RESTStoreList, RESTStore } from "api/store/model/rest-store"

export class RESTStoreMapper {
  map(store: Store): RESTStore {
    return {
      id: store.id.id.toString(),
      name: store.name,
    }
  }
}

export class RESTStoreListMapper {
  map(stores: Store[]): RESTStoreList {
    const mapper = new RESTStoreMapper()
    return { stores: stores.map((s) => mapper.map(s)) }
  }
}
