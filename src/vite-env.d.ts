// / <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_MEDUSA_ADMIN_BACKEND_URL: string
  readonly VITE_MEDUSA_STOREFRONT_URL?: string
  readonly VITE_MEDUSA_V2: "true" | "false"
}

interface ImportMeta {
  readonly env: ImportMetaEnv
  readonly hot: {
    accept: () => void
  }
}

declare const __BACKEND_URL__: string | undefined
declare const __STOREFRONT_URL__: string | undefined
declare const __BASE__: string
declare const __AUTH_TYPE__: "session" | "jwt" | undefined
declare const __JWT_TOKEN_STORAGE_KEY__: string | undefined
declare const __MAX_UPLOAD_FILE_SIZE__: number | undefined
declare const __MOCK_AUTH_ENABLED__: boolean | undefined
declare const __MOCK_API_ENABLED__: boolean | undefined
declare const __MOCK_AUTH_EMAIL__: string | undefined
declare const __MOCK_AUTH_PASSWORD__: string | undefined
