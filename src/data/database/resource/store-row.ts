import { ResourceSchema } from "./resource-schema"

export interface StoreRow {
  readonly id: string
  readonly name: string
}

export type StoreRowInsert = Pick<StoreRow, "id" | "name">

export const storeSchema = new ResourceSchema<StoreRow>("store")
