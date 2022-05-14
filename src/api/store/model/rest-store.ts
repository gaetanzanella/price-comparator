import { Static, Type } from "@sinclair/typebox"

export const RESTStore = Type.Object({
  id: Type.String(),
  name: Type.String(),
})

export type RESTStoreType = Static<typeof RESTStore>

export const RESTStoreList = Type.Object({
  stores: Type.Array(RESTStore),
})

export type RESTStoreListType = Static<typeof RESTStoreList>
