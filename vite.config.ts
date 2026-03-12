import inject from "@medusajs/admin-vite-plugin"
import react from "@vitejs/plugin-react"
import path from "node:path"
import { defineConfig, loadEnv } from "vite"
import inspect from "vite-plugin-inspect"

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())

  const BASE = env.VITE_MEDUSA_BASE || "/"
  const BACKEND_URL =
    env.VITE_BACKEND_URL ||
    env.VITE_MEDUSA_BACKEND_URL ||
    env.VITE_MEDUSA_ADMIN_BACKEND_URL ||
    "http://localhost:9000"
  const STOREFRONT_URL =
    env.VITE_MEDUSA_STOREFRONT_URL || "http://localhost:8000"
  const AUTH_TYPE = env.VITE_MEDUSA_AUTH_TYPE || undefined
  const JWT_TOKEN_STORAGE_KEY =
    env.VITE_MEDUSA_JWT_TOKEN_STORAGE_KEY || undefined
  const MAX_UPLOAD_FILE_SIZE = env.VITE_MEDUSA_MAX_UPLOAD_FILE_SIZE
    ? Number(env.VITE_MEDUSA_MAX_UPLOAD_FILE_SIZE)
    : undefined
  const MOCK_AUTH_ENABLED = env.VITE_MEDUSA_MOCK_AUTH
    ? env.VITE_MEDUSA_MOCK_AUTH === "true"
    : mode === "development"
  const MOCK_API_ENABLED = env.VITE_MEDUSA_MOCK_API
    ? env.VITE_MEDUSA_MOCK_API === "true"
    : mode === "development"
  const MOCK_AUTH_EMAIL = env.VITE_MEDUSA_MOCK_EMAIL || "admin@medusa.local"
  const MOCK_AUTH_PASSWORD = env.VITE_MEDUSA_MOCK_PASSWORD || "Admin123!"

  /**
   * Add this to your .env file to specify the project to load admin extensions from.
   */
  const MEDUSA_PROJECT = env.VITE_MEDUSA_PROJECT || null
  const sources = MEDUSA_PROJECT ? [MEDUSA_PROJECT] : []

  return {
    plugins: [
      inspect(),
      react(),
      inject({
        sources,
      }),
    ],
    define: {
      __BASE__: JSON.stringify(BASE),
      __BACKEND_URL__: JSON.stringify(BACKEND_URL),
      __STOREFRONT_URL__: STOREFRONT_URL
        ? JSON.stringify(STOREFRONT_URL)
        : "undefined",
      __AUTH_TYPE__: AUTH_TYPE ? JSON.stringify(AUTH_TYPE) : "undefined",
      __JWT_TOKEN_STORAGE_KEY__: JWT_TOKEN_STORAGE_KEY
        ? JSON.stringify(JWT_TOKEN_STORAGE_KEY)
        : "undefined",
      __MAX_UPLOAD_FILE_SIZE__:
        typeof MAX_UPLOAD_FILE_SIZE === "number"
          ? JSON.stringify(MAX_UPLOAD_FILE_SIZE)
          : "undefined",
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
    },
  }
})
