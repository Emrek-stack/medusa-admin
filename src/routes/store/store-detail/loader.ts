import { HttpTypes } from "@medusajs/types"

import { retrieveActiveStore, storeQueryKeys } from "src/hooks/api/store"
import { queryClient } from "src/lib/query-client"

const storeDetailQuery = () => ({
  queryKey: storeQueryKeys.details(),
  queryFn: async () => retrieveActiveStore(),
})

export const storeLoader = async () => {
  const query = storeDetailQuery()

  return (
    queryClient.getQueryData<HttpTypes.AdminStoreResponse>(query.queryKey) ??
    (await queryClient.fetchQuery(query))
  )
}
