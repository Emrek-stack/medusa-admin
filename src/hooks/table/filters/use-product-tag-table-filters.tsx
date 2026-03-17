import { useDateTableFilters } from "src/hooks/table/filters/use-date-table-filters"

export const useProductTagTableFilters = () => {
  const dateFilters = useDateTableFilters()

  return dateFilters
}
