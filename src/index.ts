import { DependencyProvider } from "di/dependency-provider"
import { APIApp } from "api/app"

const start = async () => {
  const dependenciesProvider = new DependencyProvider()
  const dependencies = dependenciesProvider.buildApiAppDependencies()
  const moduleLauncher = dependenciesProvider.buildModuleLauncher()
  try {
    await moduleLauncher.launch()
    const app = new APIApp(dependencies, { port: 8000 })
    await app.run()
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

start()
