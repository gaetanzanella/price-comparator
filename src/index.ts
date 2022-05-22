import { DependencyProvider } from "di/dependency-provider"
import { APIApp } from "api/app"

const start = async () => {
  try {
    const dependenciesProvider = new DependencyProvider()
    const moduleLauncher = dependenciesProvider.buildModuleLauncher()
    const result = await moduleLauncher.launch()
    const dependencies = dependenciesProvider.buildApiAppDependencies(result)
    const app = new APIApp(dependencies, { port: 8000 })
    await app.run()
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

start()
