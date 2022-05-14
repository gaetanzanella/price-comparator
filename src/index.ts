import { buildAPIAppDependencies } from "di/api-app-dependencies-factory"
import { APIApp } from "api/app"

const start = async () => {
  const dependencies = buildAPIAppDependencies()
  const app = new APIApp(dependencies, { port: 8000 })
  try {
    await app.run()
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

start()
