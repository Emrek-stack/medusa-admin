import type { FetchArgs, FetchInput } from "@medusajs/js-sdk"
import { getMockAuthUser } from "./mock-auth"

export const isMockApiEnabled = __MOCK_API_ENABLED__ ?? false

const now = new Date().toISOString()

const MOCK_STORE = {
  id: "store_mock",
  name: "Standalone Admin",
}

const MOCK_SALES_CHANNELS = [
  { id: "sc_web", name: "Web Store" },
  { id: "sc_mobile", name: "Mobile App" },
  { id: "sc_retail", name: "Retail POS" },
]

const MOCK_PRODUCT_TYPES = [
  { id: "pt_apparel", value: "Apparel" },
  { id: "pt_accessories", value: "Accessories" },
  { id: "pt_home", value: "Home" },
]

const MOCK_PRODUCT_TAGS = [
  { id: "tag_new", value: "New" },
  { id: "tag_best", value: "Best Seller" },
  { id: "tag_limited", value: "Limited" },
]

let mockCollections = [
  {
    id: "col_summer",
    title: "Summer 2026",
    handle: "summer-2026",
    created_at: now,
    updated_at: now,
  },
  {
    id: "col_basics",
    title: "Daily Basics",
    handle: "daily-basics",
    created_at: now,
    updated_at: now,
  },
  {
    id: "col_home",
    title: "Home Picks",
    handle: "home-picks",
    created_at: now,
    updated_at: now,
  },
]

const categoryAccessories = {
  id: "pc_accessories",
  name: "Accessories",
  handle: "accessories",
  is_active: true,
  is_internal: false,
  created_at: now,
  updated_at: now,
  parent_category: undefined,
  category_children: [],
}

const categoryMen = {
  id: "pc_men",
  name: "Men",
  handle: "men",
  is_active: true,
  is_internal: false,
  created_at: now,
  updated_at: now,
  parent_category: undefined,
  category_children: [
    {
      id: "pc_men_tops",
      name: "Tops",
      handle: "men-tops",
      is_active: true,
      is_internal: false,
      created_at: now,
      updated_at: now,
      parent_category: {
        id: "pc_men",
        name: "Men",
      },
      category_children: [],
    },
    {
      id: "pc_men_bottoms",
      name: "Bottoms",
      handle: "men-bottoms",
      is_active: true,
      is_internal: false,
      created_at: now,
      updated_at: now,
      parent_category: {
        id: "pc_men",
        name: "Men",
      },
      category_children: [],
    },
  ],
}

const categoryHome = {
  id: "pc_home",
  name: "Home",
  handle: "home",
  is_active: true,
  is_internal: false,
  created_at: now,
  updated_at: now,
  parent_category: undefined,
  category_children: [
    {
      id: "pc_home_living",
      name: "Living Room",
      handle: "living-room",
      is_active: true,
      is_internal: false,
      created_at: now,
      updated_at: now,
      parent_category: {
        id: "pc_home",
        name: "Home",
      },
      category_children: [],
    },
  ],
}

let mockProductCategories = [categoryMen, categoryAccessories, categoryHome]

let mockProducts = [
  {
    id: "prod_oversized_tee",
    title: "Oversized Tee",
    subtitle: "Organic cotton",
    description: "Relaxed fit t-shirt",
    handle: "oversized-tee",
    status: "published",
    thumbnail: "https://picsum.photos/seed/oversized-tee/120/120",
    collection_id: "col_summer",
    collection: { id: "col_summer", title: "Summer 2026" },
    sales_channels: [MOCK_SALES_CHANNELS[0], MOCK_SALES_CHANNELS[1]],
    variants: [
      {
        id: "variant_tee_s",
        title: "S / White",
        sku: "TEE-S-WHT",
        product_id: "prod_oversized_tee",
      },
      {
        id: "variant_tee_m",
        title: "M / White",
        sku: "TEE-M-WHT",
        product_id: "prod_oversized_tee",
      },
    ],
    type: MOCK_PRODUCT_TYPES[0],
    tags: [MOCK_PRODUCT_TAGS[0], MOCK_PRODUCT_TAGS[1]],
    categories: [categoryMen.category_children[0]],
    created_at: now,
    updated_at: now,
  },
  {
    id: "prod_canvas_tote",
    title: "Canvas Tote",
    subtitle: "Everyday carry",
    description: "Heavy canvas bag",
    handle: "canvas-tote",
    status: "published",
    thumbnail: "https://picsum.photos/seed/canvas-tote/120/120",
    collection_id: "col_basics",
    collection: { id: "col_basics", title: "Daily Basics" },
    sales_channels: [MOCK_SALES_CHANNELS[0], MOCK_SALES_CHANNELS[2]],
    variants: [
      {
        id: "variant_tote_default",
        title: "Default",
        sku: "TOT-001",
        product_id: "prod_canvas_tote",
      },
    ],
    type: MOCK_PRODUCT_TYPES[1],
    tags: [MOCK_PRODUCT_TAGS[1]],
    categories: [categoryAccessories],
    created_at: now,
    updated_at: now,
  },
  {
    id: "prod_ceramic_vase",
    title: "Ceramic Vase",
    subtitle: "Handmade",
    description: "Matte finish decorative vase",
    handle: "ceramic-vase",
    status: "draft",
    thumbnail: "https://picsum.photos/seed/ceramic-vase/120/120",
    collection_id: "col_home",
    collection: { id: "col_home", title: "Home Picks" },
    sales_channels: [MOCK_SALES_CHANNELS[0]],
    variants: [
      {
        id: "variant_vase_default",
        title: "Default",
        sku: "VAS-001",
        product_id: "prod_ceramic_vase",
      },
    ],
    type: MOCK_PRODUCT_TYPES[2],
    tags: [MOCK_PRODUCT_TAGS[2]],
    categories: [categoryHome.category_children[0]],
    created_at: now,
    updated_at: now,
  },
]

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

const parseBody = (rawBody: FetchArgs["body"]) => {
  if (!rawBody) {
    return {}
  }

  if (typeof rawBody === "string") {
    try {
      return JSON.parse(rawBody)
    } catch {
      return {}
    }
  }

  if (rawBody instanceof URLSearchParams) {
    return Object.fromEntries(rawBody.entries())
  }

  if (typeof FormData !== "undefined" && rawBody instanceof FormData) {
    return Object.fromEntries(rawBody.entries())
  }

  if (typeof rawBody === "object") {
    return rawBody as Record<string, unknown>
  }

  return {}
}

const paginate = <T>(items: T[], url: URL) => {
  const offset = toNumber(url.searchParams.get("offset"), 0)
  const limit = Math.max(
    toNumber(url.searchParams.get("limit"), items.length),
    0
  )
  const page = items.slice(offset, offset + limit)

  return {
    items: page,
    count: items.length,
    offset,
    limit,
  }
}

const includesCI = (value: string | undefined | null, term: string) => {
  if (!value) {
    return false
  }

  return value.toLowerCase().includes(term)
}

const flattenCategories = () => {
  const result: any[] = []

  const walk = (category: any) => {
    result.push(category)
    for (const child of category.category_children || []) {
      walk(child)
    }
  }

  for (const root of mockProductCategories) {
    walk(root)
  }

  return result
}

const removeCategoryById = (categories: any[], id: string): any[] => {
  return categories
    .filter((category) => category.id !== id)
    .map((category) => ({
      ...category,
      category_children: removeCategoryById(
        category.category_children || [],
        id
      ),
    }))
}

const withCollectionProducts = (collection: any) => {
  const products = mockProducts
    .filter((p) => p.collection_id === collection.id)
    .map((p) => ({ id: p.id, title: p.title }))

  return {
    ...collection,
    products,
  }
}

const handleProducts = (url: URL, method: string, init?: FetchArgs) => {
  const pathname = url.pathname.replace(/\/+$/, "")
  const productMatch = pathname.match(/^\/admin\/products\/([^/]+)$/)
  const variantsMatch = pathname.match(/^\/admin\/products\/([^/]+)\/variants$/)
  const variantMatch = pathname.match(
    /^\/admin\/products\/([^/]+)\/variants\/([^/]+)$/
  )

  if (pathname === "/admin/products" && method === "GET") {
    let items = [...mockProducts]
    const q = url.searchParams.get("q")?.trim().toLowerCase()

    if (q) {
      items = items.filter(
        (p) =>
          includesCI(p.title, q) ||
          includesCI(p.subtitle, q) ||
          includesCI(p.handle, q)
      )
    }

    const status = url.searchParams.get("status")
    if (status) {
      items = items.filter((p) => p.status === status)
    }

    const paged = paginate(items, url)

    return {
      products: paged.items,
      count: paged.count,
      offset: paged.offset,
      limit: paged.limit,
    }
  }

  if (pathname === "/admin/products" && method === "POST") {
    const body = parseBody(init?.body) as Record<string, any>
    const id = `prod_${Date.now()}`

    const collectionId = body.collection_id as string | undefined
    const collection = mockCollections.find((c) => c.id === collectionId)

    const created = {
      id,
      title: body.title || "New Product",
      subtitle: body.subtitle || "",
      description: body.description || "",
      handle: body.handle || `product-${Date.now()}`,
      status: body.status || "draft",
      thumbnail: "https://picsum.photos/seed/new-product/120/120",
      collection_id: collection?.id || null,
      collection: collection
        ? {
            id: collection.id,
            title: collection.title,
          }
        : null,
      sales_channels: [...MOCK_SALES_CHANNELS.slice(0, 1)],
      variants: [],
      type: MOCK_PRODUCT_TYPES[0],
      tags: [MOCK_PRODUCT_TAGS[0]],
      categories: [],
      created_at: now,
      updated_at: now,
    }

    mockProducts = [created, ...mockProducts]

    return { product: created }
  }

  if (productMatch && method === "GET") {
    const id = productMatch[1]
    const product = mockProducts.find((p) => p.id === id)

    return {
      product: product || mockProducts[0],
    }
  }

  if (productMatch && (method === "POST" || method === "PUT")) {
    const id = productMatch[1]
    const body = parseBody(init?.body) as Record<string, any>

    mockProducts = mockProducts.map((product) => {
      if (product.id !== id) {
        return product
      }

      return {
        ...product,
        ...body,
        updated_at: new Date().toISOString(),
      }
    })

    const updated = mockProducts.find((p) => p.id === id) || mockProducts[0]

    return {
      product: updated,
    }
  }

  if (productMatch && method === "DELETE") {
    const id = productMatch[1]
    mockProducts = mockProducts.filter((p) => p.id !== id)

    return {
      id,
      object: "product",
      deleted: true,
    }
  }

  if (variantsMatch && method === "GET") {
    const productId = variantsMatch[1]
    const product = mockProducts.find((p) => p.id === productId)
    const variants = product?.variants || []
    const paged = paginate(variants, url)

    return {
      variants: paged.items,
      count: paged.count,
      offset: paged.offset,
      limit: paged.limit,
    }
  }

  if (variantMatch && method === "GET") {
    const productId = variantMatch[1]
    const variantId = variantMatch[2]
    const product = mockProducts.find((p) => p.id === productId)
    const variant = product?.variants?.find((v: any) => v.id === variantId)

    return {
      variant: variant || null,
    }
  }

  return null
}

const handleCategories = (url: URL, method: string, init?: FetchArgs) => {
  const pathname = url.pathname.replace(/\/+$/, "")
  const categoryMatch = pathname.match(/^\/admin\/product-categories\/([^/]+)$/)

  if (pathname === "/admin/product-categories" && method === "GET") {
    const q = url.searchParams.get("q")?.trim().toLowerCase()
    const rootOnly = url.searchParams.get("parent_category_id") === "null"

    let items = rootOnly ? [...mockProductCategories] : flattenCategories()

    if (q) {
      items = flattenCategories().filter(
        (c) => includesCI(c.name, q) || includesCI(c.handle, q)
      )
    }

    const paged = paginate(items, url)

    return {
      product_categories: paged.items,
      count: paged.count,
      offset: paged.offset,
      limit: paged.limit,
    }
  }

  if (pathname === "/admin/product-categories" && method === "POST") {
    const body = parseBody(init?.body) as Record<string, any>
    const id = `pc_${Date.now()}`

    const created = {
      id,
      name: body.name || "New Category",
      handle: body.handle || `new-category-${Date.now()}`,
      is_active: true,
      is_internal: false,
      created_at: now,
      updated_at: now,
      parent_category: undefined,
      category_children: [],
    }

    mockProductCategories = [created, ...mockProductCategories]

    return {
      product_category: created,
    }
  }

  if (categoryMatch && method === "GET") {
    const id = categoryMatch[1]
    const category = flattenCategories().find((c) => c.id === id)

    return {
      product_category: category || mockProductCategories[0],
    }
  }

  if (categoryMatch && (method === "POST" || method === "PUT")) {
    const id = categoryMatch[1]
    const body = parseBody(init?.body) as Record<string, any>

    const updateCategory = (category: any): any => {
      if (category.id === id) {
        return {
          ...category,
          ...body,
          updated_at: new Date().toISOString(),
        }
      }

      return {
        ...category,
        category_children: (category.category_children || []).map(
          updateCategory
        ),
      }
    }

    mockProductCategories = mockProductCategories.map(updateCategory)

    const updated = flattenCategories().find((c) => c.id === id)

    return {
      product_category: updated || mockProductCategories[0],
    }
  }

  if (categoryMatch && method === "DELETE") {
    const id = categoryMatch[1]
    mockProductCategories = removeCategoryById(mockProductCategories, id)

    return {
      id,
      object: "product_category",
      deleted: true,
    }
  }

  return null
}

const handleCollections = (url: URL, method: string, init?: FetchArgs) => {
  const pathname = url.pathname.replace(/\/+$/, "")
  const collectionMatch = pathname.match(/^\/admin\/collections\/([^/]+)$/)

  if (pathname === "/admin/collections" && method === "GET") {
    let items = mockCollections.map(withCollectionProducts)
    const q = url.searchParams.get("q")?.trim().toLowerCase()

    if (q) {
      items = items.filter(
        (c) => includesCI(c.title, q) || includesCI(c.handle, q)
      )
    }

    const paged = paginate(items, url)

    return {
      collections: paged.items,
      count: paged.count,
      offset: paged.offset,
      limit: paged.limit,
    }
  }

  if (pathname === "/admin/collections" && method === "POST") {
    const body = parseBody(init?.body) as Record<string, any>
    const id = `col_${Date.now()}`

    const created = {
      id,
      title: body.title || "New Collection",
      handle: body.handle || `new-collection-${Date.now()}`,
      created_at: now,
      updated_at: now,
    }

    mockCollections = [created, ...mockCollections]

    return {
      collection: withCollectionProducts(created),
    }
  }

  if (collectionMatch && method === "GET") {
    const id = collectionMatch[1]
    const collection = mockCollections.find((c) => c.id === id)

    return {
      collection: withCollectionProducts(collection || mockCollections[0]),
    }
  }

  if (collectionMatch && (method === "POST" || method === "PUT")) {
    const id = collectionMatch[1]
    const body = parseBody(init?.body) as Record<string, any>

    mockCollections = mockCollections.map((collection) => {
      if (collection.id !== id) {
        return collection
      }

      return {
        ...collection,
        ...body,
        updated_at: new Date().toISOString(),
      }
    })

    const updated = mockCollections.find((c) => c.id === id)

    return {
      collection: withCollectionProducts(updated || mockCollections[0]),
    }
  }

  if (collectionMatch && method === "DELETE") {
    const id = collectionMatch[1]
    mockCollections = mockCollections.filter((c) => c.id !== id)
    mockProducts = mockProducts.map((p) => {
      if (p.collection_id === id) {
        return {
          ...p,
          collection_id: null,
          collection: null,
        }
      }

      return p
    })

    return {
      id,
      object: "collection",
      deleted: true,
    }
  }

  return null
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

    if (pathname === "/admin/sales-channels" && method === "GET") {
      const paged = paginate(MOCK_SALES_CHANNELS, url)

      return {
        sales_channels: paged.items,
        count: paged.count,
        offset: paged.offset,
        limit: paged.limit,
      }
    }

    if (pathname === "/admin/product-types" && method === "GET") {
      const paged = paginate(MOCK_PRODUCT_TYPES, url)

      return {
        product_types: paged.items,
        count: paged.count,
        offset: paged.offset,
        limit: paged.limit,
      }
    }

    if (pathname === "/admin/product-tags" && method === "GET") {
      const paged = paginate(MOCK_PRODUCT_TAGS, url)

      return {
        product_tags: paged.items,
        count: paged.count,
        offset: paged.offset,
        limit: paged.limit,
      }
    }

    const productResponse = handleProducts(url, method, init)
    if (productResponse) {
      return productResponse
    }

    const categoryResponse = handleCategories(url, method, init)
    if (categoryResponse) {
      return categoryResponse
    }

    const collectionResponse = handleCollections(url, method, init)
    if (collectionResponse) {
      return collectionResponse
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
