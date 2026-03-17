import { createMockApiFetch } from "src/lib/mock-api"

export const backendUrl = "/"
const mockFetch = createMockApiFetch()

const getOrigin = () => {
  if (typeof window !== "undefined" && window.location?.origin) {
    return window.location.origin
  }

  return "http://localhost"
}

const isPlainObject = (value: unknown): value is Record<string, unknown> => {
  return !!value && typeof value === "object" && !Array.isArray(value)
}

const appendSearchParams = (
  searchParams: URLSearchParams,
  query: Record<string, unknown>,
  prefix?: string
) => {
  for (const [key, value] of Object.entries(query)) {
    if (value === undefined || value === null) {
      continue
    }

    const queryKey = prefix ? `${prefix}.${key}` : key

    if (Array.isArray(value)) {
      value.forEach((entry) => {
        searchParams.append(queryKey, String(entry))
      })
      continue
    }

    if (isPlainObject(value)) {
      appendSearchParams(searchParams, value, queryKey)
      continue
    }

    searchParams.append(queryKey, String(value))
  }
}

const request = async (
  path: string,
  options?: {
    method?: string
    query?: Record<string, unknown>
    body?: unknown
  }
) => {
  const url = new URL(path, getOrigin())

  if (options?.query && isPlainObject(options.query)) {
    appendSearchParams(url.searchParams, options.query)
  }

  const method = options?.method || "GET"
  const body =
    options?.body === undefined ? undefined : JSON.stringify(options.body)

  return mockFetch(url.toString(), {
    method,
    body,
    headers: body
      ? {
          "content-type": "application/json",
        }
      : undefined,
  })
}

const toKebabCase = (value: string) => {
  return value
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/_/g, "-")
    .toLowerCase()
}

const adminResourcePathMap: Record<string, string> = {
  apiKey: "api-keys",
  customerGroup: "customer-groups",
  fulfillmentProvider: "fulfillment-providers",
  fulfillmentSet: "fulfillment-sets",
  inventoryItem: "inventory-items",
  orderEdit: "order-edits",
  paymentCollection: "payment-collections",
  priceList: "price-lists",
  pricePreference: "price-preferences",
  productCategory: "product-categories",
  productCollection: "collections",
  productTag: "product-tags",
  productType: "product-types",
  productVariant: "product-variants",
  refundReason: "refund-reasons",
  returnReason: "return-reasons",
  salesChannel: "sales-channels",
  shippingOption: "shipping-options",
  shippingOptionType: "shipping-option-types",
  shippingProfile: "shipping-profiles",
  stockLocation: "stock-locations",
  workflowExecution: "workflow-executions",
}

const resolveAdminResourcePath = (resource: string) => {
  return adminResourcePathMap[resource] || `${toKebabCase(resource)}s`
}

const dispatchCustomAdminMethod = (
  resourcePath: string,
  methodName: string,
  args: unknown[]
) => {
  const action = toKebabCase(methodName)
  const stringArgs = args.filter((arg) => typeof arg === "string") as string[]
  const lastArg = args[args.length - 1]
  const body =
    isPlainObject(lastArg) || Array.isArray(lastArg) ? lastArg : undefined

  let path = `/admin/${resourcePath}`

  if (stringArgs.length > 0) {
    path += `/${stringArgs[0]}`
  }

  const actionSuffix = action
    .replace(/^list-/, "")
    .replace(/^retrieve-/, "")
    .replace(/^create-/, "")
    .replace(/^update-/, "")
    .replace(/^delete-/, "")

  if (actionSuffix) {
    path += `/${actionSuffix}`
  }

  if (stringArgs.length > 1) {
    path += `/${stringArgs[1]}`
  }

  const method =
    action.startsWith("delete") || action.startsWith("remove")
      ? "DELETE"
      : action.startsWith("list") || action.startsWith("retrieve")
      ? "GET"
      : "POST"

  const query =
    method === "GET"
      ? (args.find((arg) => isPlainObject(arg)) as
          | Record<string, unknown>
          | undefined)
      : undefined

  return request(path, {
    method,
    query,
    body: method === "GET" ? undefined : body,
  })
}

const createAdminResourceProxy = (resourceKey: string) => {
  const resourcePath = resolveAdminResourcePath(resourceKey)

  return new Proxy(
    {},
    {
      get: (_, methodProp) => {
        if (typeof methodProp !== "string") {
          return undefined
        }

        const methodName = methodProp

        return (...args: unknown[]) => {
          if (methodName === "list") {
            return request(`/admin/${resourcePath}`, {
              method: "GET",
              query: args[0] as Record<string, unknown> | undefined,
            })
          }

          if (methodName === "retrieve") {
            return request(`/admin/${resourcePath}/${args[0]}`, {
              method: "GET",
              query: args[1] as Record<string, unknown> | undefined,
            })
          }

          if (methodName === "create") {
            return request(`/admin/${resourcePath}`, {
              method: "POST",
              body: args[0],
            })
          }

          if (methodName === "update") {
            return request(`/admin/${resourcePath}/${args[0]}`, {
              method: "POST",
              body: args[1],
            })
          }

          if (methodName === "delete") {
            return request(`/admin/${resourcePath}/${args[0]}`, {
              method: "DELETE",
            })
          }

          if (methodName === "me") {
            return request(`/admin/${resourcePath}/me`, {
              method: "GET",
              query: args[0] as Record<string, unknown> | undefined,
            })
          }

          return dispatchCustomAdminMethod(resourcePath, methodName, args)
        }
      },
    }
  )
}

const auth = {
  login: async (
    _scope: string,
    provider: string,
    payload?: Record<string, unknown>
  ) => {
    if (provider === "cloud") {
      return {
        location: "/login",
      }
    }

    await request("/auth/login", {
      method: "POST",
      body: payload || {},
    })

    return "mock-auth-token"
  },
  logout: async () => {
    return {}
  },
  register: async (
    _scope: string,
    _provider: string,
    payload?: Record<string, unknown>
  ) => {
    await request("/auth/register", {
      method: "POST",
      body: payload || {},
    })

    return "mock-auth-token"
  },
  resetPassword: async (
    _scope: string,
    _provider: string,
    payload?: Record<string, unknown>
  ) => {
    await request("/auth/reset-password", {
      method: "POST",
      body: payload || {},
    })
  },
  updateProvider: async (
    _scope: string,
    _provider: string,
    payload?: Record<string, unknown>
  ) => {
    await request("/auth/update-provider", {
      method: "POST",
      body: payload || {},
    })
  },
  callback: async (
    _scope: string,
    _provider: string,
    _query?: Record<string, unknown>
  ) => {
    return "mock-auth-token"
  },
  refresh: async () => {
    return "mock-auth-token"
  },
}

const admin = new Proxy(
  {},
  {
    get: (_, resourceProp) => {
      if (typeof resourceProp !== "string") {
        return undefined
      }

      return createAdminResourceProxy(resourceProp)
    },
  }
)

export const sdk: any = {
  admin,
  auth,
  client: {
    fetch_: mockFetch,
  },
}

// useful when you want to call the BE from the console and try things out quickly
if (typeof window !== "undefined") {
  ;(window as any).__sdk = sdk
}
