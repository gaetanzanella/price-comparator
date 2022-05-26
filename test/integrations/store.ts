import { notEqual } from "assert"
import { HTTPClient } from "../shared/http-client"

const client = new HTTPClient("http://0.0.0.0:8000")

describe("Stores", () => {
  test("Should get stores", async () => {
    const response = await client.get("stores")
    expect(response.statusCode).toBe(200)
    expect(response.body.stores.length).toBeGreaterThan(0)
  })

  test("Should create store", async () => {
    expect((await client.get("stores")).body.stores.length).toEqual(0)
    const create = await client.post("stores", { name: "AHAHA" })
    expect(create.statusCode).toBe(204)
    const get = await client.get("stores")
    expect(get.body.stores[0].name).toEqual("AHAHA")
  })
})
