import { Static, Type } from "@sinclair/typebox"

export const RESTEmptySchema = Type.Null()

export type RESTEmpty = Static<typeof RESTEmptySchema>
