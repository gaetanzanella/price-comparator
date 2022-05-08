import { APIApp } from "./api/app"

const start = async () => {
  const app = new APIApp({}, { port: 8000 })
  try {
    await app.run()
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

start()
