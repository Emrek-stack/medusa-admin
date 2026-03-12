import react from "@vitejs/plugin-react"
import child_process from "node:child_process"
import fs from "node:fs"
import path from "node:path"
import { env as processEnv } from "node:process"
import { defineConfig, loadEnv } from "vite"
import inspect from "vite-plugin-inspect"

// https://vitejs.dev/config/
export default defineConfig(({ mode, command }) => {
  const env = loadEnv(mode, process.cwd())

  const mockAuthEnv = env.VITE_MOCK_AUTH ?? env.VITE_MEDUSA_MOCK_AUTH
  const mockApiEnv = env.VITE_MOCK_API ?? env.VITE_MEDUSA_MOCK_API
  const MOCK_AUTH_ENABLED =
    mockAuthEnv !== undefined ? mockAuthEnv === "true" : true
  const MOCK_API_ENABLED =
    mockApiEnv !== undefined ? mockApiEnv === "true" : true
  const MOCK_AUTH_EMAIL =
    env.VITE_MOCK_EMAIL || env.VITE_MEDUSA_MOCK_EMAIL || "admin@medusa.local"
  const MOCK_AUTH_PASSWORD =
    env.VITE_MOCK_PASSWORD || env.VITE_MEDUSA_MOCK_PASSWORD || "Admin123!"
  const ASPNET_TARGET = processEnv.ASPNETCORE_HTTPS_PORT
    ? `https://localhost:${processEnv.ASPNETCORE_HTTPS_PORT}`
    : processEnv.ASPNETCORE_URLS
      ? processEnv.ASPNETCORE_URLS.split(";")[0]
      : "https://localhost:7245"

  let https:
    | {
        key: Buffer
        cert: Buffer
      }
    | undefined

  if (command === "serve") {
    const baseFolder =
      processEnv.APPDATA && processEnv.APPDATA !== ""
        ? `${processEnv.APPDATA}/ASP.NET/https`
        : `${processEnv.HOME}/.aspnet/https`

    const certificateName =
      processEnv.VITE_ASPNET_CERT_NAME || "medus-react.client"
    const certFilePath = path.join(baseFolder, `${certificateName}.pem`)
    const keyFilePath = path.join(baseFolder, `${certificateName}.key`)

    if (!fs.existsSync(baseFolder)) {
      fs.mkdirSync(baseFolder, { recursive: true })
    }

    if (!fs.existsSync(certFilePath) || !fs.existsSync(keyFilePath)) {
      const certResult = child_process.spawnSync(
        "dotnet",
        [
          "dev-certs",
          "https",
          "--export-path",
          certFilePath,
          "--format",
          "Pem",
          "--no-password",
        ],
        { stdio: "inherit" }
      )

      if (certResult.status !== 0) {
        throw new Error(
          "Could not create ASP.NET Core development certificate."
        )
      }
    }

    https = {
      key: fs.readFileSync(keyFilePath),
      cert: fs.readFileSync(certFilePath),
    }
  }

  return {
    plugins: [inspect(), react()],
    define: {
      __BASE__: JSON.stringify("/"),
      __MOCK_AUTH_ENABLED__: JSON.stringify(MOCK_AUTH_ENABLED),
      __MOCK_API_ENABLED__: JSON.stringify(MOCK_API_ENABLED),
      __MOCK_AUTH_EMAIL__: JSON.stringify(MOCK_AUTH_EMAIL),
      __MOCK_AUTH_PASSWORD__: JSON.stringify(MOCK_AUTH_PASSWORD),
    },
    resolve: {
      alias: {
        "@medusajs/js-sdk": path.resolve(
          __dirname,
          "./src/shims/medusa-js-sdk.ts"
        ),
        "@medusajs/admin-shared": path.resolve(
          __dirname,
          "./src/shims/admin-shared.ts"
        ),
      },
    },
    server: {
      open: true,
      port: Number(processEnv.DEV_SERVER_PORT || env.VITE_DEV_SERVER_PORT || 5175),
      https,
      proxy: {
        "^/api": {
          target: ASPNET_TARGET,
          secure: false,
        },
      },
    },
  }
})
