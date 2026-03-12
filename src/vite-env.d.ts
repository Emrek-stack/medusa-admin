// / <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_MOCK_AUTH?: "true" | "false"
  readonly VITE_MOCK_API?: "true" | "false"
  readonly VITE_MOCK_EMAIL?: string
  readonly VITE_MOCK_PASSWORD?: string
  readonly VITE_MEDUSA_MOCK_AUTH?: "true" | "false"
  readonly VITE_MEDUSA_MOCK_API?: "true" | "false"
  readonly VITE_MEDUSA_MOCK_EMAIL?: string
  readonly VITE_MEDUSA_MOCK_PASSWORD?: string
  readonly VITE_DEV_SERVER_PORT?: string
  readonly VITE_MEDUSA_V2: "true" | "false"
}

interface ImportMeta {
  readonly env: ImportMetaEnv
  readonly hot: {
    accept: () => void
  }
}

declare const __BASE__: string
declare const __MOCK_AUTH_ENABLED__: boolean | undefined
declare const __MOCK_API_ENABLED__: boolean | undefined
declare const __MOCK_AUTH_EMAIL__: string | undefined
declare const __MOCK_AUTH_PASSWORD__: string | undefined
