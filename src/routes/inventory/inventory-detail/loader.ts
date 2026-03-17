import { LoaderFunctionArgs } from "react-router-dom"

import { inventoryItemsQueryKeys } from "src/hooks/api/inventory"
import { sdk } from "src/lib/client"
import { queryClient } from "src/lib/query-client"
import { INVENTORY_DETAIL_FIELDS } from "src/routes/inventory/inventory-detail/constants"

const inventoryDetailQuery = (id: string) => ({
  queryKey: inventoryItemsQueryKeys.detail(id),
  queryFn: async () =>
    sdk.admin.inventoryItem.retrieve(id, {
      fields: INVENTORY_DETAIL_FIELDS,
    }),
})

export const inventoryItemLoader = async ({ params }: LoaderFunctionArgs) => {
  const id = params.id
  const query = inventoryDetailQuery(id!)

  return queryClient.ensureQueryData(query)
}
