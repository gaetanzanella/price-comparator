import { Static, Type } from "@sinclair/typebox"

export const RESTStoreSchema = Type.Object({
  id: Type.String(),
  name: Type.String(),
})

export type RESTStore = Static<typeof RESTStoreSchema>

export const RESTStoreListSchema = Type.Object({
  stores: Type.Array(RESTStoreSchema),
})

export type RESTStoreList = Static<typeof RESTStoreListSchema>

export const RESTStoreFormSchema = Type.Object({
  name: Type.String(),
})

export type RESTStoreForm = Static<typeof RESTStoreFormSchema>
