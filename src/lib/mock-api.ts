import type { FetchArgs, FetchInput } from "@medusajs/js-sdk"
import { getMockAuthUser } from "./mock-auth"

export const isMockApiEnabled = __MOCK_API_ENABLED__ ?? false

const MOCK_STORE = {
  id: "store_mock",
  name: "Standalone Admin",
}

const RESERVED_SEGMENTS = new Set([
  "me",
  "search",
  "batch",
  "auth",
  "callback",
  "refresh",
  "accept",
  "complete",
  "reset-password",
  "password-token",
])

const toUrl = (input: FetchInput) => {
  if (input instanceof URL) {
    return input
  }

  if (typeof input === "string") {
    return new URL(input, window.location.origin)
  }

  return new URL(input.url, window.location.origin)
}

const toNumber = (value: string | null, fallback: number) => {
  if (!value) {
    return fallback
  }

  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : fallback
}

const toKey = (segment: string) => segment.replace(/-/g, "_")

const singularize = (segment: string) => {
  const key = toKey(segment)

  if (key.endsWith("ies")) {
    return `${key.slice(0, -3)}y`
  }

  if (key.endsWith("ses")) {
    return key.slice(0, -2)
  }

  if (key.endsWith("s")) {
    return key.slice(0, -1)
  }

  return key
}

const isLikelyId = (segment: string) => {
  if (!segment || RESERVED_SEGMENTS.has(segment)) {
    return false
  }

  if (/^\d+$/.test(segment)) {
    return true
  }

  if (segment.includes("_")) {
    return true
  }

  if (/^[0-9a-f-]{16,}$/i.test(segment)) {
    return true
  }

  return false
}

const createListResponse = (key: string, url: URL) => {
  return {
    [key]: [],
    count: 0,
    offset: toNumber(url.searchParams.get("offset"), 0),
    limit: toNumber(url.searchParams.get("limit"), 0),
  }
}

const createObjectResponse = (key: string, id?: string) => {
  return {
    [key]: id ? { id } : {},
  }
}

const maybeListResponse = (segment: string, url: URL) => {
  const looksLikeList =
    segment.endsWith("s") ||
    url.searchParams.has("limit") ||
    url.searchParams.has("offset") ||
    url.searchParams.has("q")

  if (!looksLikeList) {
    return null
  }

  return createListResponse(toKey(segment), url)
}

const stripScopeSegment = (segments: string[]) => {
  if (!segments.length) {
    return segments
  }

  if (segments[0] === "admin" || segments[0] === "store") {
    return segments.slice(1)
  }

  return segments
}

export const createMockApiFetch = () => {
  return async (input: FetchInput, init?: FetchArgs): Promise<any> => {
    const method = (init?.method || "GET").toUpperCase()
    const url = toUrl(input)
    const pathname = url.pathname.replace(/\/+$/, "")

    if (pathname === "/cloud/auth" && method === "GET") {
      return { enabled: false }
    }

    if (pathname === "/cloud/auth/users" && method === "POST") {
      return {}
    }

    if (pathname === "/admin/users/me" && method === "GET") {
      return { user: getMockAuthUser() }
    }

    if (pathname === "/admin/stores" && method === "GET") {
      return {
        stores: [MOCK_STORE],
        count: 1,
        offset: 0,
        limit: 1,
      }
    }

    if (pathname === "/admin/store" && method === "GET") {
      return { store: MOCK_STORE }
    }

    const scopedSegments = stripScopeSegment(
      pathname.split("/").filter(Boolean)
    )

    if (!scopedSegments.length) {
      return {}
    }

    const last = scopedSegments[scopedSegments.length - 1]
    const prev =
      scopedSegments.length > 1
        ? scopedSegments[scopedSegments.length - 2]
        : undefined

    if (method === "GET") {
      if (isLikelyId(last) && prev) {
        return createObjectResponse(singularize(prev), last)
      }

      const listResponse = maybeListResponse(last, url)

      if (listResponse) {
        return listResponse
      }

      return createObjectResponse(toKey(last))
    }

    if (method === "DELETE") {
      const targetId = isLikelyId(last) ? last : undefined
      const objectName = prev ? singularize(prev) : singularize(last)

      return {
        id: targetId,
        object: objectName,
        deleted: true,
      }
    }

    if (isLikelyId(last) && prev) {
      return createObjectResponse(singularize(prev), last)
    }

    return createObjectResponse(singularize(last))
  }
}
