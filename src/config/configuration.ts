export type Configuration = {
  env: string
  service: {
    name: string
    version: string
  }
  logger: {
    level: string
  }
  database: {
    client: string
    connection: {
      host: string
      port: number
      user: string
      password: string
      database: string
    }
  }
}
