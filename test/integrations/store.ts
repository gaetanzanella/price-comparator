
import { HTTPClient } from "../shared/http-client"

const client = new HTTPClient("http://0.0.0.0:8000")

describe("Stores", () => {

  test("Should get stores", async () => {
    const response = await client.get("stores")
    expect(response.statusCode).toBe(200)
    expect(response.body.stores.length).toEqual(1)
  })
})
