import { Store } from "core/models/store"
import { RESTStoreListType, RESTStoreType } from "api/store/model/rest-store"

export class RESTStoreMapper {
  map(store: Store): RESTStoreType {
    return {
      id: store.id.id.toString(),
      name: store.name,
    }
  }
}

export class RESTStoreListMapper {
  map(stores: Store[]): RESTStoreListType {
    const mapper = new RESTStoreMapper()
    return { stores: stores.map((s) => mapper.map(s)) }
  }
}
