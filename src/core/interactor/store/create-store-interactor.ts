import { Store } from "core/models/store"
import { StoreForm } from "core/models/store-form"

export interface CreateStoreInteractor {
  execute(form: StoreForm): Promise<void>
}
