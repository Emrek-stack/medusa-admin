import {
  AdminReturnReasonListParams,
  AdminReturnReasonListResponse,
} from "@medusajs/types"

import { returnReasonsQueryKeys } from "src/hooks/api/return-reasons"
import { sdk } from "src/lib/client"
import { queryClient } from "src/lib/query-client"

const returnReasonListQuery = (query?: AdminReturnReasonListParams) => ({
  queryKey: returnReasonsQueryKeys.list(query),
  queryFn: async () => sdk.admin.returnReason.list(query),
})

export const returnReasonListLoader = async () => {
  const query = returnReasonListQuery()
  return (
    queryClient.getQueryData<AdminReturnReasonListResponse>(query.queryKey) ??
    (await queryClient.fetchQuery(query))
  )
}
