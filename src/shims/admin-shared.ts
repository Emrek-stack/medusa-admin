export type CustomFieldContainerZone = string
export type CustomFieldFormTab = string
export type CustomFieldFormZone = string
export type CustomFieldModel = string
export type InjectionZone = string
export type NestedRoutePosition = string

export const NESTED_ROUTE_POSITIONS: NestedRoutePosition[] = [
  "before",
  "after",
  "in",
]

const isObject = (value: unknown): value is Record<string, unknown> => {
  return !!value && typeof value === "object" && !Array.isArray(value)
}

export const deepMerge = <T extends Record<string, unknown>>(
  target: T,
  source?: Record<string, unknown>
): T => {
  if (!source) {
    return target
  }

  const output: Record<string, unknown> = { ...target }

  Object.keys(source).forEach((key) => {
    const targetValue = output[key]
    const sourceValue = source[key]

    if (isObject(targetValue) && isObject(sourceValue)) {
      output[key] = deepMerge(targetValue, sourceValue)
      return
    }

    output[key] = sourceValue
  })

  return output as T
}
