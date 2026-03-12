import { FetchError } from "@medusajs/js-sdk"
import { HttpTypes } from "@medusajs/types"

const MOCK_AUTH_STORAGE_KEY = "medusa_mock_auth_session"

export const isMockAuthEnabled = __MOCK_AUTH_ENABLED__ ?? false
export const mockAuthEmail = __MOCK_AUTH_EMAIL__ ?? "admin@medusa.local"
export const mockAuthPassword = __MOCK_AUTH_PASSWORD__ ?? "Admin123!"

export const signInWithMockAuth = async (payload: {
  email: string
  password: string
}) => {
  const isValidCredential =
    payload.email === mockAuthEmail && payload.password === mockAuthPassword

  if (!isValidCredential) {
    throw new FetchError(
      "Invalid mock credentials",
      "Unauthorized",
      401
    )
  }

  if (typeof window !== "undefined") {
    window.localStorage.setItem(MOCK_AUTH_STORAGE_KEY, "1")
  }

  return "mock-auth-token"
}

export const signOutMockAuth = async () => {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem(MOCK_AUTH_STORAGE_KEY)
  }
}

export const isMockAuthenticated = () => {
  if (typeof window === "undefined") {
    return false
  }

  return window.localStorage.getItem(MOCK_AUTH_STORAGE_KEY) === "1"
}

export const getMockAuthUser = (): HttpTypes.AdminUser => {
  const now = new Date().toISOString()

  return {
    id: "user_mock_admin",
    first_name: "Mock",
    last_name: "Admin",
    email: mockAuthEmail,
    avatar_url: null,
    metadata: null,
    created_at: now,
    updated_at: now,
    deleted_at: null,
  } as HttpTypes.AdminUser
}
