import got, { Got } from "got"

export class HTTPClient {
  #got: Got

  constructor(prefix: string) {
    this.#got = got.extend({
      prefixUrl: prefix,
      responseType: "json",
      throwHttpErrors: false,
    })
  }

  get(path: string): Promise<any> {
    return this.#got.get(path)
  }
}
