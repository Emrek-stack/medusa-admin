import { refundReasonsQueryKeys } from "src/hooks/api"
import { sdk } from "src/lib/client"
import { queryClient } from "src/lib/query-client"

const refundReasonListQuery = () => ({
  queryKey: refundReasonsQueryKeys.list(),
  queryFn: async () => sdk.admin.refundReason.list(),
})

export const refundReasonListLoader = async () => {
  const query = refundReasonListQuery()
  return (
    queryClient.getQueryData(query.queryKey) ??
    (await queryClient.fetchQuery(query))
  )
}
