import { ResourceSchema } from "./resource-schema"

export interface StoreRow {
  readonly uuid: number
  readonly name: string
}

export const storeSchema = new ResourceSchema<StoreRow>("store")
