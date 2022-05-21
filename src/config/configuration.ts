export type Configuration = {
  env: string
  service: {
    name: string
    version: string
  }
  logger: {
    level: string
  }
}
