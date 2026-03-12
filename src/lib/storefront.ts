const FALLBACK_STOREFRONT_URL =
  typeof window !== "undefined" ? window.location.origin : ""

export const MEDUSA_STOREFRONT_URL =
  __STOREFRONT_URL__ ?? FALLBACK_STOREFRONT_URL
