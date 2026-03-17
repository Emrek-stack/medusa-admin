import { LoaderFunctionArgs } from "react-router-dom"

import { ordersQueryKeys } from "src/hooks/api/orders"
import { sdk } from "src/lib/client"
import { queryClient } from "src/lib/query-client"
import { DEFAULT_FIELDS } from "src/routes/orders/order-detail/constants"

const orderDetailQuery = (id: string) => ({
  queryKey: ordersQueryKeys.detail(id),
  queryFn: async () =>
    sdk.admin.order.retrieve(id, {
      fields: DEFAULT_FIELDS,
    }),
})

export const orderLoader = async ({ params }: LoaderFunctionArgs) => {
  const id = params.id
  const query = orderDetailQuery(id!)

  return queryClient.ensureQueryData(query)
}
