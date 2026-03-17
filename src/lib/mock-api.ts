import type { FetchArgs, FetchInput } from "@medusajs/js-sdk"
import { getMockAuthUser } from "src/lib/mock-auth"

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

let mockCustomers = [
  {
    id: "cus_01J1A1A1A1A1A1A1A1A1A1A1A1",
    email: "ayse.yilmaz@example.com",
    first_name: "Ayse",
    last_name: "Yilmaz",
    company_name: "Northwind Textiles",
    phone: "+90 555 010 0101",
    has_account: true,
    created_at: now,
    updated_at: now,
    addresses: [
      {
        id: "cusaddr_01J1A1A1A1A1A1A1A1A1A1A1A1",
        address_name: "Office",
        first_name: "Ayse",
        last_name: "Yilmaz",
        phone: "+90 555 010 0101",
        company: "Northwind Textiles",
        address_1: "Maslak Mah. Buyukdere Cad. No:120",
        address_2: "Kat 5",
        city: "Istanbul",
        province: "Istanbul",
        postal_code: "34485",
        country_code: "tr",
        metadata: {},
        created_at: now,
        updated_at: now,
      },
    ],
    metadata: {},
  },
  {
    id: "cus_01J1B2B2B2B2B2B2B2B2B2B2B2",
    email: "emre.kaya@example.com",
    first_name: "Emre",
    last_name: "Kaya",
    company_name: "Blue Atlas",
    phone: "+90 555 010 0102",
    has_account: true,
    created_at: now,
    updated_at: now,
    addresses: [
      {
        id: "cusaddr_01J1B2B2B2B2B2B2B2B2B2B2B2",
        address_name: "HQ",
        first_name: "Emre",
        last_name: "Kaya",
        phone: "+90 555 010 0102",
        company: "Blue Atlas",
        address_1: "Ataturk Cd. No:45",
        address_2: "",
        city: "Ankara",
        province: "Ankara",
        postal_code: "06510",
        country_code: "tr",
        metadata: {},
        created_at: now,
        updated_at: now,
      },
    ],
    metadata: {},
  },
  {
    id: "cus_01J1C3C3C3C3C3C3C3C3C3C3C3",
    email: "selin.arslan@example.com",
    first_name: "Selin",
    last_name: "Arslan",
    company_name: "",
    phone: "+90 555 010 0103",
    has_account: false,
    created_at: now,
    updated_at: now,
    addresses: [],
    metadata: {},
  },
  {
    id: "cus_01J1D4D4D4D4D4D4D4D4D4D4D4",
    email: "can.demir@example.com",
    first_name: "Can",
    last_name: "Demir",
    company_name: "Demir Commerce",
    phone: "+90 555 010 0104",
    has_account: true,
    created_at: now,
    updated_at: now,
    addresses: [],
    metadata: {},
  },
  {
    id: "cus_01J1E5E5E5E5E5E5E5E5E5E5E5",
    email: "zeynep.ak@example.com",
    first_name: "Zeynep",
    last_name: "Ak",
    company_name: "",
    phone: "+90 555 010 0105",
    has_account: false,
    created_at: now,
    updated_at: now,
    addresses: [],
    metadata: {},
  },
]

let mockCustomerGroups = [
  {
    id: "cusgrp_vip",
    name: "VIP Customers",
    created_at: now,
    updated_at: now,
    customer_ids: [
      "cus_01J1A1A1A1A1A1A1A1A1A1A1A1",
      "cus_01J1B2B2B2B2B2B2B2B2B2B2B2",
    ],
    metadata: {},
  },
  {
    id: "cusgrp_wholesale",
    name: "Wholesale",
    created_at: now,
    updated_at: now,
    customer_ids: [
      "cus_01J1D4D4D4D4D4D4D4D4D4D4D4",
      "cus_01J1B2B2B2B2B2B2B2B2B2B2B2",
    ],
    metadata: {},
  },
  {
    id: "cusgrp_newsletter",
    name: "Newsletter",
    created_at: now,
    updated_at: now,
    customer_ids: [
      "cus_01J1C3C3C3C3C3C3C3C3C3C3C3",
      "cus_01J1E5E5E5E5E5E5E5E5E5E5E5",
    ],
    metadata: {},
  },
]

const MOCK_STOCK_LOCATIONS = [
  { id: "sl_istanbul", name: "Istanbul Warehouse" },
  { id: "sl_ankara", name: "Ankara Warehouse" },
  { id: "sl_izmir", name: "Izmir Warehouse" },
]

let mockInventoryItems = [
  {
    id: "iitem_tee_white",
    title: "Oversized Tee Inventory",
    sku: "TEE-M-WHT",
    hs_code: "6109.10",
    mid_code: "TR1001",
    material: "Cotton",
    weight: 240,
    length: 30,
    height: 2,
    width: 22,
    origin_country: "tr",
    metadata: {},
    variants: [mockProducts[0].variants[1]],
    location_levels: [
      {
        location_id: "sl_istanbul",
        stocked_quantity: 120,
        reserved_quantity: 18,
      },
      {
        location_id: "sl_ankara",
        stocked_quantity: 65,
        reserved_quantity: 7,
      },
    ],
    created_at: now,
    updated_at: now,
  },
  {
    id: "iitem_tote_default",
    title: "Canvas Tote Inventory",
    sku: "TOT-001",
    hs_code: "4202.92",
    mid_code: "TR1002",
    material: "Canvas",
    weight: 320,
    length: 35,
    height: 3,
    width: 40,
    origin_country: "tr",
    metadata: {},
    variants: [mockProducts[1].variants[0]],
    location_levels: [
      {
        location_id: "sl_istanbul",
        stocked_quantity: 82,
        reserved_quantity: 11,
      },
      {
        location_id: "sl_izmir",
        stocked_quantity: 47,
        reserved_quantity: 3,
      },
    ],
    created_at: now,
    updated_at: now,
  },
  {
    id: "iitem_vase_default",
    title: "Ceramic Vase Inventory",
    sku: "VAS-001",
    hs_code: "6913.90",
    mid_code: "TR1003",
    material: "Ceramic",
    weight: 900,
    length: 14,
    height: 24,
    width: 14,
    origin_country: "tr",
    metadata: {},
    variants: [mockProducts[2].variants[0]],
    location_levels: [
      {
        location_id: "sl_ankara",
        stocked_quantity: 39,
        reserved_quantity: 2,
      },
    ],
    created_at: now,
    updated_at: now,
  },
]

let mockOrders = [
  {
    id: "order_01",
    status: "completed",
    created_at: now,
    updated_at: now,
    email: "ayse.yilmaz@example.com",
    display_id: 1001,
    custom_display_id: "ORD-1001",
    payment_status: "captured",
    fulfillment_status: "fulfilled",
    total: 48900,
    currency_code: "try",
    customer: {
      id: "cus_01J1A1A1A1A1A1A1A1A1A1A1A1",
      first_name: "Ayse",
      last_name: "Yilmaz",
      email: "ayse.yilmaz@example.com",
    },
    sales_channel: MOCK_SALES_CHANNELS[0],
    shipping_address: {
      country_code: "tr",
      city: "Istanbul",
      address_1: "Maslak Mah. Buyukdere Cad. No:120",
    },
    billing_address: {
      country_code: "tr",
      city: "Istanbul",
      address_1: "Maslak Mah. Buyukdere Cad. No:120",
    },
    items: [
      {
        id: "orditem_01",
        created_at: now,
        quantity: 2,
        title: "Oversized Tee",
        subtitle: "Organic cotton",
        unit_price: 14950,
        total: 29900,
        variant: mockProducts[0].variants[1],
      },
      {
        id: "orditem_02",
        created_at: now,
        quantity: 1,
        title: "Canvas Tote",
        subtitle: "Everyday carry",
        unit_price: 19000,
        total: 19000,
        variant: mockProducts[1].variants[0],
      },
    ],
    payment_collections: [
      {
        id: "paycol_01",
        amount: 48900,
        authorized_amount: 48900,
        captured_amount: 48900,
        refunded_amount: 0,
        payments: [],
      },
    ],
    promotions: [],
    shipping_methods: [],
    credit_lines: [],
    fulfillments: [],
    metadata: {},
    order_change: null,
  },
  {
    id: "order_02",
    status: "pending",
    created_at: now,
    updated_at: now,
    email: "emre.kaya@example.com",
    display_id: 1002,
    custom_display_id: "ORD-1002",
    payment_status: "awaiting",
    fulfillment_status: "not_fulfilled",
    total: 14950,
    currency_code: "try",
    customer: {
      id: "cus_01J1B2B2B2B2B2B2B2B2B2B2B2",
      first_name: "Emre",
      last_name: "Kaya",
      email: "emre.kaya@example.com",
    },
    sales_channel: MOCK_SALES_CHANNELS[1],
    shipping_address: {
      country_code: "tr",
      city: "Ankara",
      address_1: "Ataturk Cd. No:45",
    },
    billing_address: {
      country_code: "tr",
      city: "Ankara",
      address_1: "Ataturk Cd. No:45",
    },
    items: [
      {
        id: "orditem_03",
        created_at: now,
        quantity: 1,
        title: "Oversized Tee",
        subtitle: "Organic cotton",
        unit_price: 14950,
        total: 14950,
        variant: mockProducts[0].variants[0],
      },
    ],
    payment_collections: [
      {
        id: "paycol_02",
        amount: 14950,
        authorized_amount: 14950,
        captured_amount: 0,
        refunded_amount: 0,
        payments: [],
      },
    ],
    promotions: [],
    shipping_methods: [],
    credit_lines: [],
    fulfillments: [],
    metadata: {},
    order_change: null,
  },
]

let mockPromotions = [
  {
    id: "promo_summer15",
    code: "SUMMER15",
    type: "standard",
    is_automatic: false,
    status: "active",
    application_method: {
      type: "percentage",
      value: 15,
      allocation: "across",
      target_type: "items",
      currency_code: null,
    },
    is_tax_inclusive: false,
    campaign: {
      id: "camp_summer",
      name: "Summer Campaign",
      starts_at: now,
      ends_at: null,
      budget: null,
    },
    created_at: now,
    updated_at: now,
  },
  {
    id: "promo_bundle20",
    code: "BUNDLE20",
    type: "buyget",
    is_automatic: true,
    status: "active",
    application_method: {
      type: "fixed",
      value: 2000,
      allocation: "each",
      target_type: "items",
      currency_code: "try",
    },
    is_tax_inclusive: true,
    campaign: {
      id: "camp_bundle",
      name: "Bundle Campaign",
      starts_at: now,
      ends_at: null,
      budget: { limit: 1000000, used: 250000 },
    },
    created_at: now,
    updated_at: now,
  },
]

const mockPromotionRules: Record<string, Record<string, any[]>> = {
  promo_summer15: {
    rules: [
      {
        id: "prule_01",
        attribute: "customer_group_id",
        attribute_label: "Customer Group",
        operator: "in",
        operator_label: "is in",
        values: [{ value: "cusgrp_vip", label: "VIP Customers" }],
        field_type: "text",
      },
    ],
    "target-rules": [
      {
        id: "prule_02",
        attribute: "product_collection_id",
        attribute_label: "Collection",
        operator: "in",
        operator_label: "is in",
        values: [{ value: "col_summer", label: "Summer 2026" }],
        field_type: "text",
      },
    ],
    "buy-rules": [],
  },
  promo_bundle20: {
    rules: [],
    "target-rules": [
      {
        id: "prule_03",
        attribute: "product_id",
        attribute_label: "Product",
        operator: "in",
        operator_label: "is in",
        values: [{ value: "prod_canvas_tote", label: "Canvas Tote" }],
        field_type: "text",
      },
    ],
    "buy-rules": [
      {
        id: "prule_04",
        attribute: "product_id",
        attribute_label: "Product",
        operator: "in",
        operator_label: "is in",
        values: [{ value: "prod_oversized_tee", label: "Oversized Tee" }],
        field_type: "text",
      },
    ],
  },
}

let mockPriceLists = [
  {
    id: "pl_default_sale",
    title: "Summer Sale 2026",
    description: "Seasonal campaign pricing",
    type: "sale",
    status: "active",
    starts_at: now,
    ends_at: null,
    created_at: now,
    updated_at: now,
  },
  {
    id: "pl_b2b_override",
    title: "B2B Override",
    description: "Special B2B customer pricing",
    type: "override",
    status: "draft",
    starts_at: null,
    ends_at: null,
    created_at: now,
    updated_at: now,
  },
]

const mockPriceListPrices: Record<string, any[]> = {
  pl_default_sale: [
    {
      id: "plprice_01",
      amount: 12950,
      currency_code: "try",
      variant_id: "variant_tee_s",
      rules: {},
    },
    {
      id: "plprice_02",
      amount: 16900,
      currency_code: "try",
      variant_id: "variant_tote_default",
      rules: {},
    },
  ],
  pl_b2b_override: [
    {
      id: "plprice_03",
      amount: 9900,
      currency_code: "try",
      variant_id: "variant_tee_m",
      rules: {},
    },
  ],
}

const mockPriceListProducts: Record<string, string[]> = {
  pl_default_sale: ["prod_oversized_tee", "prod_canvas_tote"],
  pl_b2b_override: ["prod_oversized_tee"],
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

const getQueryArray = (url: URL, key: string) => {
  const direct = url.searchParams.getAll(key)
  const bracket = url.searchParams.getAll(`${key}[]`)
  const values = [...direct, ...bracket].filter(Boolean)

  if (values.length) {
    return values
  }

  const single = url.searchParams.get(key)
  if (!single) {
    return []
  }

  if (single.includes(",")) {
    return single
      .split(",")
      .map((v) => v.trim())
      .filter(Boolean)
  }

  try {
    if (single.startsWith("[")) {
      const parsed = JSON.parse(single)
      return normalizeIdList(parsed)
    }
  } catch {
    // noop
  }

  return [single]
}

const normalizeIdList = (value: unknown): string[] => {
  if (!Array.isArray(value)) {
    return []
  }

  return value
    .map((entry) => {
      if (typeof entry === "string") {
        return entry
      }

      if (entry && typeof entry === "object" && "id" in entry) {
        const id = (entry as { id?: unknown }).id
        return typeof id === "string" ? id : null
      }

      return null
    })
    .filter((id): id is string => Boolean(id))
}

const sortItems = <T extends Record<string, any>>(items: T[], order?: string) => {
  if (!order) {
    return items
  }

  const direction = order.startsWith("-") ? -1 : 1
  const key = order.replace(/^-/, "")

  return [...items].sort((a, b) => {
    const av = a[key]
    const bv = b[key]

    if (av == null && bv == null) {
      return 0
    }

    if (av == null) {
      return -1 * direction
    }

    if (bv == null) {
      return 1 * direction
    }

    if (typeof av === "string" && typeof bv === "string") {
      return av.localeCompare(bv) * direction
    }

    if (av > bv) {
      return 1 * direction
    }

    if (av < bv) {
      return -1 * direction
    }

    return 0
  })
}

const findCustomer = (id: string) => mockCustomers.find((c) => c.id === id)
const findCustomerGroup = (id: string) =>
  mockCustomerGroups.find((g) => g.id === id)

const customerToSummary = (customer: any) => ({
  id: customer.id,
  email: customer.email,
  first_name: customer.first_name,
  last_name: customer.last_name,
  has_account: customer.has_account,
  created_at: customer.created_at,
  updated_at: customer.updated_at,
})

const groupToSummary = (group: any) => ({
  id: group.id,
  name: group.name,
  created_at: group.created_at,
  updated_at: group.updated_at,
})

const enrichCustomer = (customer: any) => {
  const groups = mockCustomerGroups
    .filter((group) => group.customer_ids.includes(customer.id))
    .map(groupToSummary)

  return {
    ...customer,
    groups,
    customer_groups: groups,
  }
}

const enrichCustomerGroup = (group: any) => {
  const customers = group.customer_ids
    .map((id: string) => findCustomer(id))
    .filter(Boolean)
    .map(customerToSummary)

  return {
    ...group,
    customers,
  }
}

const extractCustomerFilterId = (url: URL) => {
  const direct =
    url.searchParams.get("customers.id") ||
    url.searchParams.get("customer_id") ||
    url.searchParams.get("customers")

  if (direct) {
    try {
      if (direct.startsWith("{")) {
        const parsed = JSON.parse(direct)
        if (parsed?.id && typeof parsed.id === "string") {
          return parsed.id
        }
      }
    } catch {
      // noop
    }

    return direct
  }

  for (const [key, value] of url.searchParams.entries()) {
    if (!key.includes("customers")) {
      continue
    }

    if (!value) {
      continue
    }

    try {
      if (value.startsWith("{")) {
        const parsed = JSON.parse(value)
        if (parsed?.id && typeof parsed.id === "string") {
          return parsed.id
        }
      }
    } catch {
      // noop
    }

    return value
  }

  return undefined
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

const withInventoryTotals = (item: any) => {
  const stocked_quantity = (item.location_levels || []).reduce(
    (acc: number, level: any) => acc + (level.stocked_quantity || 0),
    0
  )
  const reserved_quantity = (item.location_levels || []).reduce(
    (acc: number, level: any) => acc + (level.reserved_quantity || 0),
    0
  )

  return {
    ...item,
    stocked_quantity,
    reserved_quantity,
  }
}

const toInventoryLevels = (item: any) => {
  return (item.location_levels || []).map((level: any) => {
    const location =
      MOCK_STOCK_LOCATIONS.find((loc) => loc.id === level.location_id) || null

    return {
      id: `${item.id}_${level.location_id}`,
      inventory_item_id: item.id,
      location_id: level.location_id,
      stocked_quantity: level.stocked_quantity || 0,
      reserved_quantity: level.reserved_quantity || 0,
      available_quantity:
        (level.stocked_quantity || 0) - (level.reserved_quantity || 0),
      stock_locations: location ? [location] : [],
    }
  })
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

    const priceListIds = getQueryArray(url, "price_list_id")
    if (priceListIds.length) {
      items = items.filter((product) =>
        priceListIds.some((priceListId) =>
          (mockPriceListProducts[priceListId] || []).includes(product.id)
        )
      )
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

const handleInventory = (url: URL, method: string, init?: FetchArgs) => {
  const pathname = url.pathname.replace(/\/+$/, "")
  const itemMatch = pathname.match(/^\/admin\/inventory-items\/([^/]+)$/)
  const levelsMatch = pathname.match(
    /^\/admin\/inventory-items\/([^/]+)\/location-levels$/
  )
  const levelMatch = pathname.match(
    /^\/admin\/inventory-items\/([^/]+)\/location-levels\/([^/]+)$/
  )
  const batchItemLevelsMatch = pathname.match(
    /^\/admin\/inventory-items\/([^/]+)\/location-levels\/batch$/
  )
  const batchItemsLevelsMatch = pathname.match(
    /^\/admin\/inventory-items\/location-levels\/batch$/
  )

  if (pathname === "/admin/inventory-items" && method === "GET") {
    let items = [...mockInventoryItems]
    const q = url.searchParams.get("q")?.trim().toLowerCase()

    if (q) {
      items = items.filter(
        (item) => includesCI(item.title, q) || includesCI(item.sku, q)
      )
    }

    items = sortItems(
      items.map(withInventoryTotals),
      url.searchParams.get("order") || undefined
    )

    const paged = paginate(items, url)

    return {
      inventory_items: paged.items,
      count: paged.count,
      offset: paged.offset,
      limit: paged.limit,
    }
  }

  if (pathname === "/admin/inventory-items" && method === "POST") {
    const body = parseBody(init?.body) as Record<string, any>
    const timestamp = new Date().toISOString()
    const created = {
      id: `iitem_${Date.now()}`,
      title: (body.title as string) || "New Inventory Item",
      sku: (body.sku as string) || "",
      hs_code: (body.hs_code as string) || "",
      mid_code: (body.mid_code as string) || "",
      material: (body.material as string) || "",
      weight: (body.weight as number) || null,
      length: (body.length as number) || null,
      height: (body.height as number) || null,
      width: (body.width as number) || null,
      origin_country: (body.origin_country as string) || "tr",
      metadata: (body.metadata as Record<string, unknown>) || {},
      variants: [],
      location_levels: [],
      created_at: timestamp,
      updated_at: timestamp,
    }

    mockInventoryItems = [created, ...mockInventoryItems]
    return { inventory_item: withInventoryTotals(created) }
  }

  if (itemMatch && method === "GET") {
    const item = mockInventoryItems.find((i) => i.id === itemMatch[1])
    return { inventory_item: withInventoryTotals(item || mockInventoryItems[0]) }
  }

  if (itemMatch && (method === "POST" || method === "PUT")) {
    const id = itemMatch[1]
    const body = parseBody(init?.body) as Record<string, any>
    const timestamp = new Date().toISOString()

    mockInventoryItems = mockInventoryItems.map((item) =>
      item.id === id ? { ...item, ...body, updated_at: timestamp } : item
    )

    const updated = mockInventoryItems.find((i) => i.id === id)
    return { inventory_item: withInventoryTotals(updated || mockInventoryItems[0]) }
  }

  if (itemMatch && method === "DELETE") {
    const id = itemMatch[1]
    mockInventoryItems = mockInventoryItems.filter((i) => i.id !== id)
    return { id, object: "inventory_item", deleted: true }
  }

  if (levelsMatch && method === "GET") {
    const item = mockInventoryItems.find((i) => i.id === levelsMatch[1])
    const levels = item ? toInventoryLevels(item) : []
    const paged = paginate(levels, url)

    return {
      inventory_levels: paged.items,
      count: paged.count,
      offset: paged.offset,
      limit: paged.limit,
    }
  }

  if (levelMatch && (method === "POST" || method === "PUT")) {
    const itemId = levelMatch[1]
    const locationId = levelMatch[2]
    const body = parseBody(init?.body) as Record<string, any>
    const stocked = Number(body.stocked_quantity ?? body.stocked ?? 0)
    const reserved = Number(body.reserved_quantity ?? body.reserved ?? 0)

    mockInventoryItems = mockInventoryItems.map((item) => {
      if (item.id !== itemId) {
        return item
      }

      const exists = (item.location_levels || []).some(
        (l: any) => l.location_id === locationId
      )

      const updatedLevels = exists
        ? item.location_levels.map((level: any) =>
            level.location_id === locationId
              ? {
                  ...level,
                  stocked_quantity: Number.isFinite(stocked)
                    ? stocked
                    : level.stocked_quantity,
                  reserved_quantity: Number.isFinite(reserved)
                    ? reserved
                    : level.reserved_quantity,
                }
              : level
          )
        : [
            ...item.location_levels,
            {
              location_id: locationId,
              stocked_quantity: Number.isFinite(stocked) ? stocked : 0,
              reserved_quantity: Number.isFinite(reserved) ? reserved : 0,
            },
          ]

      return {
        ...item,
        location_levels: updatedLevels,
        updated_at: new Date().toISOString(),
      }
    })

    const updated = mockInventoryItems.find((i) => i.id === itemId)
    return { inventory_item: withInventoryTotals(updated || mockInventoryItems[0]) }
  }

  if (levelMatch && method === "DELETE") {
    const itemId = levelMatch[1]
    const locationId = levelMatch[2]

    mockInventoryItems = mockInventoryItems.map((item) => {
      if (item.id !== itemId) {
        return item
      }

      return {
        ...item,
        location_levels: item.location_levels.filter(
          (level: any) => level.location_id !== locationId
        ),
        updated_at: new Date().toISOString(),
      }
    })

    return { id: `${itemId}_${locationId}`, object: "inventory_level", deleted: true }
  }

  if (batchItemLevelsMatch && method === "POST") {
    const itemId = batchItemLevelsMatch[1]
    const body = parseBody(init?.body) as Record<string, any>
    const create = Array.isArray(body.create) ? body.create : []
    const update = Array.isArray(body.update) ? body.update : []
    const del = normalizeIdList(body.delete)

    mockInventoryItems = mockInventoryItems.map((item) => {
      if (item.id !== itemId) {
        return item
      }

      let levels = [...item.location_levels]

      for (const locationId of del) {
        levels = levels.filter((level: any) => level.location_id !== locationId)
      }

      for (const entry of [...create, ...update]) {
        if (!entry || typeof entry !== "object") {
          continue
        }
        const locationId = (entry as any).location_id
        if (!locationId) {
          continue
        }
        const stocked = Number((entry as any).stocked_quantity ?? 0)
        const reserved = Number((entry as any).reserved_quantity ?? 0)
        const idx = levels.findIndex((l: any) => l.location_id === locationId)
        if (idx >= 0) {
          levels[idx] = {
            ...levels[idx],
            stocked_quantity: Number.isFinite(stocked)
              ? stocked
              : levels[idx].stocked_quantity,
            reserved_quantity: Number.isFinite(reserved)
              ? reserved
              : levels[idx].reserved_quantity,
          }
        } else {
          levels.push({
            location_id: locationId,
            stocked_quantity: Number.isFinite(stocked) ? stocked : 0,
            reserved_quantity: Number.isFinite(reserved) ? reserved : 0,
          })
        }
      }

      return {
        ...item,
        location_levels: levels,
        updated_at: new Date().toISOString(),
      }
    })

    const updated = mockInventoryItems.find((i) => i.id === itemId)
    return { inventory_item: withInventoryTotals(updated || mockInventoryItems[0]) }
  }

  if (batchItemsLevelsMatch && method === "POST") {
    const body = parseBody(init?.body) as Record<string, any>
    const updates = Array.isArray(body.inventory_items) ? body.inventory_items : []

    for (const entry of updates) {
      if (!entry || typeof entry !== "object") {
        continue
      }

      const itemId = (entry as any).inventory_item_id
      const locationId = (entry as any).location_id
      if (!itemId || !locationId) {
        continue
      }

      const stocked = Number((entry as any).stocked_quantity ?? 0)
      const reserved = Number((entry as any).reserved_quantity ?? 0)

      mockInventoryItems = mockInventoryItems.map((item) => {
        if (item.id !== itemId) {
          return item
        }

        const idx = item.location_levels.findIndex(
          (lvl: any) => lvl.location_id === locationId
        )

        const levels = [...item.location_levels]
        if (idx >= 0) {
          levels[idx] = {
            ...levels[idx],
            stocked_quantity: Number.isFinite(stocked)
              ? stocked
              : levels[idx].stocked_quantity,
            reserved_quantity: Number.isFinite(reserved)
              ? reserved
              : levels[idx].reserved_quantity,
          }
        } else {
          levels.push({
            location_id: locationId,
            stocked_quantity: Number.isFinite(stocked) ? stocked : 0,
            reserved_quantity: Number.isFinite(reserved) ? reserved : 0,
          })
        }

        return {
          ...item,
          location_levels: levels,
          updated_at: new Date().toISOString(),
        }
      })
    }

    return { updated: true }
  }

  return null
}

const handleOrders = (url: URL, method: string, init?: FetchArgs) => {
  const pathname = url.pathname.replace(/\/+$/, "")
  const orderMatch = pathname.match(/^\/admin\/orders\/([^/]+)$/)
  const previewMatch = pathname.match(/^\/admin\/orders\/([^/]+)\/preview$/)
  const changesMatch = pathname.match(/^\/admin\/orders\/([^/]+)\/changes$/)
  const lineItemsMatch = pathname.match(/^\/admin\/orders\/([^/]+)\/line-items$/)
  const shippingOptionsMatch = pathname.match(
    /^\/admin\/orders\/([^/]+)\/shipping-options$/
  )
  const nestedOrderActionMatch = pathname.match(/^\/admin\/orders\/([^/]+)\/.+$/)

  if (pathname === "/admin/orders" && method === "GET") {
    let items = [...mockOrders]
    const q = url.searchParams.get("q")?.trim().toLowerCase()
    const customerId = url.searchParams.get("customer_id")

    if (q) {
      items = items.filter(
        (order) =>
          includesCI(order.email, q) ||
          includesCI(order.custom_display_id, q) ||
          includesCI(`${order.display_id}`, q)
      )
    }

    if (customerId) {
      items = items.filter((order) => order.customer?.id === customerId)
    }

    items = sortItems(items, url.searchParams.get("order") || "-created_at")

    const paged = paginate(items, url)

    return {
      orders: paged.items,
      count: paged.count,
      offset: paged.offset,
      limit: paged.limit,
    }
  }

  if (orderMatch && method === "GET") {
    const order = mockOrders.find((o) => o.id === orderMatch[1])
    return { order: order || mockOrders[0] }
  }

  if (orderMatch && (method === "POST" || method === "PUT")) {
    const id = orderMatch[1]
    const body = parseBody(init?.body) as Record<string, any>
    mockOrders = mockOrders.map((order) =>
      order.id === id
        ? { ...order, ...body, updated_at: new Date().toISOString() }
        : order
    )
    const updated = mockOrders.find((o) => o.id === id) || mockOrders[0]
    return { order: updated }
  }

  if (previewMatch && method === "GET") {
    const order = mockOrders.find((o) => o.id === previewMatch[1]) || mockOrders[0]
    return { order }
  }

  if (changesMatch && method === "GET") {
    return { order_changes: [], count: 0, offset: 0, limit: 20 }
  }

  if (lineItemsMatch && method === "GET") {
    const order = mockOrders.find((o) => o.id === lineItemsMatch[1]) || mockOrders[0]
    const items = order.items || []
    const paged = paginate(items, url)
    return {
      order_items: paged.items,
      count: paged.count,
      offset: paged.offset,
      limit: paged.limit,
    }
  }

  if (shippingOptionsMatch && method === "GET") {
    return {
      shipping_options: [
        {
          id: "so_standard",
          name: "Standard Shipping",
          price_type: "flat",
          amount: 4900,
        },
        {
          id: "so_express",
          name: "Express Shipping",
          price_type: "flat",
          amount: 9900,
        },
      ],
    }
  }

  if (pathname === "/admin/orders/export" && method === "POST") {
    return { transaction_id: `export_${Date.now()}` }
  }

  if (nestedOrderActionMatch && method === "POST") {
    const order = mockOrders.find((o) => o.id === nestedOrderActionMatch[1]) || mockOrders[0]
    return { order }
  }

  return null
}

const handlePromotions = (url: URL, method: string, init?: FetchArgs) => {
  const pathname = url.pathname.replace(/\/+$/, "")
  const promotionMatch = pathname.match(/^\/admin\/promotions\/([^/]+)$/)
  const rulesByPathMatch = pathname.match(
    /^\/admin\/promotions\/([^/]+)\/(rules|target-rules|buy-rules)$/
  )
  const rulesGenericMatch = pathname.match(
    /^\/admin\/promotions\/([^/]+)\/rules(?:\/batch)?$/
  )
  const rulesBatchTypedMatch = pathname.match(
    /^\/admin\/promotions\/([^/]+)\/(rules|target-rules|buy-rules)\/batch$/
  )

  if (pathname === "/admin/promotions" && method === "GET") {
    let items = [...mockPromotions]
    const q = url.searchParams.get("q")?.trim().toLowerCase()
    const campaignId = url.searchParams.get("campaign_id")

    if (q) {
      items = items.filter((promo) => includesCI(promo.code, q))
    }

    if (campaignId) {
      items = items.filter((promo) => promo.campaign?.id === campaignId)
    }

    items = sortItems(items, url.searchParams.get("order") || "-created_at")

    const paged = paginate(items, url)
    return {
      promotions: paged.items,
      count: paged.count,
      offset: paged.offset,
      limit: paged.limit,
    }
  }

  if (pathname === "/admin/promotions" && method === "POST") {
    const body = parseBody(init?.body) as Record<string, any>
    const timestamp = new Date().toISOString()
    const created = {
      id: `promo_${Date.now()}`,
      code: (body.code as string) || `PROMO${Date.now()}`,
      type: (body.type as string) || "standard",
      is_automatic: Boolean(body.is_automatic),
      status: (body.status as string) || "draft",
      application_method: (body.application_method as Record<string, unknown>) || {
        type: "percentage",
        value: 10,
        allocation: "across",
        target_type: "items",
      },
      is_tax_inclusive: Boolean(body.is_tax_inclusive),
      campaign: (body.campaign as Record<string, unknown>) || null,
      created_at: timestamp,
      updated_at: timestamp,
    }
    mockPromotions = [created, ...mockPromotions]
    mockPromotionRules[created.id] = { rules: [], "target-rules": [], "buy-rules": [] }
    return { promotion: created }
  }

  if (promotionMatch && method === "GET") {
    const promotion = mockPromotions.find((p) => p.id === promotionMatch[1])
    return { promotion: promotion || mockPromotions[0] }
  }

  if (promotionMatch && (method === "POST" || method === "PUT")) {
    const id = promotionMatch[1]
    const body = parseBody(init?.body) as Record<string, any>
    mockPromotions = mockPromotions.map((promotion) =>
      promotion.id === id
        ? { ...promotion, ...body, updated_at: new Date().toISOString() }
        : promotion
    )
    const updated = mockPromotions.find((p) => p.id === id) || mockPromotions[0]
    return { promotion: updated }
  }

  if (promotionMatch && method === "DELETE") {
    const id = promotionMatch[1]
    mockPromotions = mockPromotions.filter((p) => p.id !== id)
    delete mockPromotionRules[id]
    return { id, object: "promotion", deleted: true }
  }

  const resolveRuleType = (fallback = "rules") => {
    return (
      url.searchParams.get("rule_type") ||
      url.searchParams.get("type") ||
      fallback
    )
  }

  if (rulesByPathMatch && method === "GET") {
    const promotionId = rulesByPathMatch[1]
    const ruleType = rulesByPathMatch[2]
    return {
      rules: mockPromotionRules[promotionId]?.[ruleType] || [],
      count: (mockPromotionRules[promotionId]?.[ruleType] || []).length,
      offset: 0,
      limit: 50,
    }
  }

  if (rulesGenericMatch && method === "GET") {
    const promotionId = rulesGenericMatch[1]
    const ruleType = resolveRuleType()
    return {
      rules: mockPromotionRules[promotionId]?.[ruleType] || [],
      count: (mockPromotionRules[promotionId]?.[ruleType] || []).length,
      offset: 0,
      limit: 50,
    }
  }

  if ((rulesGenericMatch || rulesBatchTypedMatch) && method === "POST") {
    const promotionId =
      (rulesGenericMatch && rulesGenericMatch[1]) ||
      (rulesBatchTypedMatch && rulesBatchTypedMatch[1]) ||
      ""
    const explicitType =
      (rulesBatchTypedMatch && rulesBatchTypedMatch[2]) || undefined
    const ruleType = explicitType || resolveRuleType()
    const body = parseBody(init?.body) as Record<string, any>
    const add = Array.isArray(body.add) ? body.add : []
    const remove = normalizeIdList(body.remove)
    const update = Array.isArray(body.update) ? body.update : []
    const current = mockPromotionRules[promotionId]?.[ruleType] || []

    let next = [...current]
    if (add.length) {
      const normalized = add.map((entry: any, index: number) => ({
        id: entry.id || `prule_${Date.now()}_${index}`,
        attribute: entry.attribute || "product_id",
        attribute_label: entry.attribute_label || "Product",
        operator: entry.operator || "in",
        operator_label: entry.operator_label || "is in",
        values: entry.values || [],
        field_type: entry.field_type || "text",
      }))
      next = [...next, ...normalized]
    }
    if (remove.length) {
      next = next.filter((rule: any) => !remove.includes(rule.id))
    }
    if (update.length) {
      next = next.map((rule: any) => {
        const patch = update.find((u: any) => u.id === rule.id)
        return patch ? { ...rule, ...patch } : rule
      })
    }

    mockPromotionRules[promotionId] = {
      ...(mockPromotionRules[promotionId] || {
        rules: [],
        "target-rules": [],
        "buy-rules": [],
      }),
      [ruleType]: next,
    }

    const promotion = mockPromotions.find((p) => p.id === promotionId) || mockPromotions[0]
    return { promotion }
  }

  if (pathname === "/admin/promotions/rule-attributes" && method === "GET") {
    return {
      attributes: [
        { value: "product_id", label: "Product" },
        { value: "product_collection_id", label: "Collection" },
        { value: "customer_group_id", label: "Customer Group" },
      ],
    }
  }

  if (pathname === "/admin/promotions/rule-values" && method === "GET") {
    const attribute = url.searchParams.get("rule_attribute")

    if (attribute === "product_id") {
      return {
        values: mockProducts.map((p) => ({ value: p.id, label: p.title })),
      }
    }

    if (attribute === "product_collection_id") {
      return {
        values: mockCollections.map((c) => ({ value: c.id, label: c.title })),
      }
    }

    if (attribute === "customer_group_id") {
      return {
        values: mockCustomerGroups.map((g) => ({ value: g.id, label: g.name })),
      }
    }

    return { values: [] }
  }

  return null
}

const handlePriceLists = (url: URL, method: string, init?: FetchArgs) => {
  const pathname = url.pathname.replace(/\/+$/, "")
  const priceListMatch = pathname.match(/^\/admin\/price-lists\/([^/]+)$/)
  const pricesMatch = pathname.match(/^\/admin\/price-lists\/([^/]+)\/prices$/)
  const batchPricesMatch = pathname.match(
    /^\/admin\/price-lists\/([^/]+)\/prices\/batch$/
  )
  const linkProductsMatch = pathname.match(
    /^\/admin\/price-lists\/([^/]+)\/products$/
  )

  if (pathname === "/admin/price-lists" && method === "GET") {
    let items = [...mockPriceLists]
    const q = url.searchParams.get("q")?.trim().toLowerCase()

    if (q) {
      items = items.filter((priceList) => includesCI(priceList.title, q))
    }

    items = sortItems(items, url.searchParams.get("order") || "-created_at")
    const paged = paginate(items, url)

    return {
      price_lists: paged.items,
      count: paged.count,
      offset: paged.offset,
      limit: paged.limit,
    }
  }

  if (pathname === "/admin/price-lists" && method === "POST") {
    const body = parseBody(init?.body) as Record<string, any>
    const timestamp = new Date().toISOString()
    const created = {
      id: `pl_${Date.now()}`,
      title: (body.title as string) || "New Price List",
      description: (body.description as string) || "",
      type: (body.type as string) || "sale",
      status: (body.status as string) || "draft",
      starts_at: (body.starts_at as string) || null,
      ends_at: (body.ends_at as string) || null,
      created_at: timestamp,
      updated_at: timestamp,
    }
    mockPriceLists = [created, ...mockPriceLists]
    mockPriceListPrices[created.id] = []
    mockPriceListProducts[created.id] = []
    return { price_list: created }
  }

  if (priceListMatch && method === "GET") {
    const priceList = mockPriceLists.find((pl) => pl.id === priceListMatch[1])
    return { price_list: priceList || mockPriceLists[0] }
  }

  if (priceListMatch && (method === "POST" || method === "PUT")) {
    const id = priceListMatch[1]
    const body = parseBody(init?.body) as Record<string, any>
    mockPriceLists = mockPriceLists.map((priceList) =>
      priceList.id === id
        ? { ...priceList, ...body, updated_at: new Date().toISOString() }
        : priceList
    )
    const updated = mockPriceLists.find((pl) => pl.id === id) || mockPriceLists[0]
    return { price_list: updated }
  }

  if (priceListMatch && method === "DELETE") {
    const id = priceListMatch[1]
    mockPriceLists = mockPriceLists.filter((pl) => pl.id !== id)
    delete mockPriceListPrices[id]
    delete mockPriceListProducts[id]
    return { id, object: "price_list", deleted: true }
  }

  if (pricesMatch && method === "GET") {
    const id = pricesMatch[1]
    const prices = mockPriceListPrices[id] || []
    const paged = paginate(prices, url)
    return {
      price_list_prices: paged.items,
      count: paged.count,
      offset: paged.offset,
      limit: paged.limit,
    }
  }

  if (batchPricesMatch && method === "POST") {
    const id = batchPricesMatch[1]
    const body = parseBody(init?.body) as Record<string, any>
    const create = Array.isArray(body.create) ? body.create : []
    const remove = normalizeIdList(body.delete || body.remove)
    const update = Array.isArray(body.update) ? body.update : []

    let prices = [...(mockPriceListPrices[id] || [])]
    if (remove.length) {
      prices = prices.filter((price: any) => !remove.includes(price.id))
    }
    if (update.length) {
      prices = prices.map((price: any) => {
        const patch = update.find((p: any) => p.id === price.id)
        return patch ? { ...price, ...patch } : price
      })
    }
    if (create.length) {
      prices = [
        ...prices,
        ...create.map((entry: any, index: number) => ({
          id: entry.id || `plprice_${Date.now()}_${index}`,
          amount: Number(entry.amount || 0),
          currency_code: entry.currency_code || "try",
          variant_id: entry.variant_id || null,
          rules: entry.rules || {},
        })),
      ]
    }

    mockPriceListPrices[id] = prices

    return {
      created: create.length,
      updated: update.length,
      deleted: remove.length,
    }
  }

  if (linkProductsMatch && method === "POST") {
    const id = linkProductsMatch[1]
    const body = parseBody(init?.body) as Record<string, any>
    const add = normalizeIdList(body.add)
    const remove = normalizeIdList(body.remove)
    const current = new Set(mockPriceListProducts[id] || [])

    for (const pid of add) {
      current.add(pid)
    }
    for (const pid of remove) {
      current.delete(pid)
    }

    mockPriceListProducts[id] = Array.from(current)
    const priceList = mockPriceLists.find((pl) => pl.id === id) || mockPriceLists[0]
    return { price_list: priceList }
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

const handleCustomers = (url: URL, method: string, init?: FetchArgs) => {
  const pathname = url.pathname.replace(/\/+$/, "")
  const customerMatch = pathname.match(/^\/admin\/customers\/([^/]+)$/)
  const addressesMatch = pathname.match(/^\/admin\/customers\/([^/]+)\/addresses$/)
  const addressMatch = pathname.match(
    /^\/admin\/customers\/([^/]+)\/addresses\/([^/]+)$/
  )
  const customerGroupsBatchMatch = pathname.match(
    /^\/admin\/customers\/([^/]+)\/customer-groups(?:\/batch)?$/
  )

  if (pathname === "/admin/customers" && method === "GET") {
    let items = [...mockCustomers]
    const q = url.searchParams.get("q")?.trim().toLowerCase()

    if (q) {
      items = items.filter(
        (customer) =>
          includesCI(customer.email, q) ||
          includesCI(customer.first_name, q) ||
          includesCI(customer.last_name, q) ||
          includesCI(customer.company_name, q) ||
          includesCI(customer.phone, q)
      )
    }

    const groupId = url.searchParams.get("groups")
    if (groupId) {
      items = items.filter((customer) =>
        mockCustomerGroups.some(
          (group) =>
            group.id === groupId && group.customer_ids.includes(customer.id)
        )
      )
    }

    const hasAccount = url.searchParams.get("has_account")
    if (hasAccount === "true" || hasAccount === "false") {
      items = items.filter((customer) => `${customer.has_account}` === hasAccount)
    }

    items = sortItems(items, url.searchParams.get("order") || undefined)

    const paged = paginate(items.map(enrichCustomer), url)

    return {
      customers: paged.items,
      count: paged.count,
      offset: paged.offset,
      limit: paged.limit,
    }
  }

  if (pathname === "/admin/customers" && method === "POST") {
    const body = parseBody(init?.body) as Record<string, any>
    const createdAt = new Date().toISOString()
    const id = `cus_${Date.now()}`

    const created = {
      id,
      email: (body.email as string) || `${id}@example.com`,
      first_name: (body.first_name as string) || "",
      last_name: (body.last_name as string) || "",
      company_name: (body.company_name as string) || "",
      phone: (body.phone as string) || "",
      has_account: false,
      created_at: createdAt,
      updated_at: createdAt,
      addresses: [],
      metadata: (body.metadata as Record<string, unknown>) || {},
    }

    mockCustomers = [created, ...mockCustomers]

    return {
      customer: enrichCustomer(created),
    }
  }

  if (customerMatch && method === "GET") {
    const id = customerMatch[1]
    const customer = findCustomer(id)

    return {
      customer: enrichCustomer(customer || mockCustomers[0]),
    }
  }

  if (customerMatch && (method === "POST" || method === "PUT")) {
    const id = customerMatch[1]
    const body = parseBody(init?.body) as Record<string, any>
    const timestamp = new Date().toISOString()

    mockCustomers = mockCustomers.map((customer) => {
      if (customer.id !== id) {
        return customer
      }

      return {
        ...customer,
        ...body,
        updated_at: timestamp,
      }
    })

    const updated = findCustomer(id) || mockCustomers[0]

    return {
      customer: enrichCustomer(updated),
    }
  }

  if (customerMatch && method === "DELETE") {
    const id = customerMatch[1]
    mockCustomers = mockCustomers.filter((customer) => customer.id !== id)
    mockCustomerGroups = mockCustomerGroups.map((group) => ({
      ...group,
      customer_ids: group.customer_ids.filter((customerId) => customerId !== id),
      updated_at: new Date().toISOString(),
    }))

    return {
      id,
      object: "customer",
      deleted: true,
    }
  }

  if (addressesMatch && method === "GET") {
    const customerId = addressesMatch[1]
    const customer = findCustomer(customerId)

    return {
      customer: enrichCustomer(customer || mockCustomers[0]),
    }
  }

  if (addressesMatch && method === "POST") {
    const customerId = addressesMatch[1]
    const body = parseBody(init?.body) as Record<string, any>
    const timestamp = new Date().toISOString()
    const addressId = `cusaddr_${Date.now()}`

    mockCustomers = mockCustomers.map((customer) => {
      if (customer.id !== customerId) {
        return customer
      }

      const createdAddress = {
        id: addressId,
        address_name: (body.address_name as string) || "Address",
        first_name:
          (body.first_name as string) || customer.first_name || "",
        last_name: (body.last_name as string) || customer.last_name || "",
        phone: (body.phone as string) || customer.phone || "",
        company: (body.company as string) || customer.company_name || "",
        address_1: (body.address_1 as string) || "",
        address_2: (body.address_2 as string) || "",
        city: (body.city as string) || "",
        province: (body.province as string) || "",
        postal_code: (body.postal_code as string) || "",
        country_code: (body.country_code as string) || "tr",
        metadata: (body.metadata as Record<string, unknown>) || {},
        created_at: timestamp,
        updated_at: timestamp,
      }

      return {
        ...customer,
        addresses: [createdAddress, ...(customer.addresses || [])],
        updated_at: timestamp,
      }
    })

    const updated = findCustomer(customerId) || mockCustomers[0]

    return {
      customer: enrichCustomer(updated),
    }
  }

  if (addressMatch && method === "GET") {
    const customerId = addressMatch[1]
    const addressId = addressMatch[2]
    const customer = findCustomer(customerId)
    const address =
      customer?.addresses?.find((item: any) => item.id === addressId) || null

    return {
      address,
    }
  }

  if (addressMatch && (method === "POST" || method === "PUT")) {
    const customerId = addressMatch[1]
    const addressId = addressMatch[2]
    const body = parseBody(init?.body) as Record<string, any>
    const timestamp = new Date().toISOString()

    mockCustomers = mockCustomers.map((customer) => {
      if (customer.id !== customerId) {
        return customer
      }

      return {
        ...customer,
        updated_at: timestamp,
        addresses: (customer.addresses || []).map((address: any) => {
          if (address.id !== addressId) {
            return address
          }

          return {
            ...address,
            ...body,
            updated_at: timestamp,
          }
        }),
      }
    })

    const updated = findCustomer(customerId) || mockCustomers[0]

    return {
      customer: enrichCustomer(updated),
    }
  }

  if (addressMatch && method === "DELETE") {
    const customerId = addressMatch[1]
    const addressId = addressMatch[2]
    const timestamp = new Date().toISOString()

    mockCustomers = mockCustomers.map((customer) => {
      if (customer.id !== customerId) {
        return customer
      }

      return {
        ...customer,
        updated_at: timestamp,
        addresses: (customer.addresses || []).filter(
          (address: any) => address.id !== addressId
        ),
      }
    })

    const updated = findCustomer(customerId) || mockCustomers[0]

    return {
      customer: enrichCustomer(updated),
    }
  }

  if (customerGroupsBatchMatch && method === "POST") {
    const customerId = customerGroupsBatchMatch[1]
    const body = parseBody(init?.body) as Record<string, any>
    const add = normalizeIdList(body.add)
    const remove = normalizeIdList(body.remove)
    const timestamp = new Date().toISOString()

    if (add.length) {
      mockCustomerGroups = mockCustomerGroups.map((group) => {
        if (!add.includes(group.id)) {
          return group
        }

        if (group.customer_ids.includes(customerId)) {
          return group
        }

        return {
          ...group,
          customer_ids: [...group.customer_ids, customerId],
          updated_at: timestamp,
        }
      })
    }

    if (remove.length) {
      mockCustomerGroups = mockCustomerGroups.map((group) => {
        if (!remove.includes(group.id)) {
          return group
        }

        return {
          ...group,
          customer_ids: group.customer_ids.filter((id) => id !== customerId),
          updated_at: timestamp,
        }
      })
    }

    const customer = findCustomer(customerId) || mockCustomers[0]

    return {
      customer: enrichCustomer(customer),
    }
  }

  return null
}

const handleCustomerGroups = (url: URL, method: string, init?: FetchArgs) => {
  const pathname = url.pathname.replace(/\/+$/, "")
  const groupMatch = pathname.match(/^\/admin\/customer-groups\/([^/]+)$/)
  const batchCustomersMatch = pathname.match(
    /^\/admin\/customer-groups\/([^/]+)\/customers(?:\/batch)?$/
  )

  if (pathname === "/admin/customer-groups" && method === "GET") {
    let items = [...mockCustomerGroups]
    const q = url.searchParams.get("q")?.trim().toLowerCase()

    if (q) {
      items = items.filter((group) => includesCI(group.name, q))
    }

    const customerFilterId = extractCustomerFilterId(url)
    if (customerFilterId) {
      items = items.filter((group) => group.customer_ids.includes(customerFilterId))
    }

    items = sortItems(items, url.searchParams.get("order") || undefined)

    const paged = paginate(items.map(enrichCustomerGroup), url)

    return {
      customer_groups: paged.items,
      count: paged.count,
      offset: paged.offset,
      limit: paged.limit,
    }
  }

  if (pathname === "/admin/customer-groups" && method === "POST") {
    const body = parseBody(init?.body) as Record<string, any>
    const timestamp = new Date().toISOString()
    const id = `cusgrp_${Date.now()}`

    const created = {
      id,
      name: (body.name as string) || "New Customer Group",
      created_at: timestamp,
      updated_at: timestamp,
      customer_ids: [] as string[],
      metadata: (body.metadata as Record<string, unknown>) || {},
    }

    mockCustomerGroups = [created, ...mockCustomerGroups]

    return {
      customer_group: enrichCustomerGroup(created),
    }
  }

  if (groupMatch && method === "GET") {
    const id = groupMatch[1]
    const group = findCustomerGroup(id)

    return {
      customer_group: enrichCustomerGroup(group || mockCustomerGroups[0]),
    }
  }

  if (groupMatch && (method === "POST" || method === "PUT")) {
    const id = groupMatch[1]
    const body = parseBody(init?.body) as Record<string, any>
    const timestamp = new Date().toISOString()

    mockCustomerGroups = mockCustomerGroups.map((group) => {
      if (group.id !== id) {
        return group
      }

      return {
        ...group,
        ...body,
        updated_at: timestamp,
      }
    })

    const updated = findCustomerGroup(id) || mockCustomerGroups[0]

    return {
      customer_group: enrichCustomerGroup(updated),
    }
  }

  if (groupMatch && method === "DELETE") {
    const id = groupMatch[1]
    mockCustomerGroups = mockCustomerGroups.filter((group) => group.id !== id)

    return {
      id,
      object: "customer_group",
      deleted: true,
    }
  }

  if (batchCustomersMatch && method === "POST") {
    const groupId = batchCustomersMatch[1]
    const body = parseBody(init?.body) as Record<string, any>
    const add = normalizeIdList(body.add)
    const remove = normalizeIdList(body.remove)
    const timestamp = new Date().toISOString()

    mockCustomerGroups = mockCustomerGroups.map((group) => {
      if (group.id !== groupId) {
        return group
      }

      const current = new Set(group.customer_ids)
      for (const id of add) {
        current.add(id)
      }
      for (const id of remove) {
        current.delete(id)
      }

      return {
        ...group,
        customer_ids: Array.from(current),
        updated_at: timestamp,
      }
    })

    const updated = findCustomerGroup(groupId) || mockCustomerGroups[0]

    return {
      customer_group: enrichCustomerGroup(updated),
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

    const customerResponse = handleCustomers(url, method, init)
    if (customerResponse) {
      return customerResponse
    }

    const customerGroupResponse = handleCustomerGroups(url, method, init)
    if (customerGroupResponse) {
      return customerGroupResponse
    }

    const inventoryResponse = handleInventory(url, method, init)
    if (inventoryResponse) {
      return inventoryResponse
    }

    const orderResponse = handleOrders(url, method, init)
    if (orderResponse) {
      return orderResponse
    }

    const promotionResponse = handlePromotions(url, method, init)
    if (promotionResponse) {
      return promotionResponse
    }

    const priceListResponse = handlePriceLists(url, method, init)
    if (priceListResponse) {
      return priceListResponse
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
