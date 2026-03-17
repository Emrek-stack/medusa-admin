import { LoaderFunctionArgs } from "react-router-dom"

import { productsQueryKeys } from "src/hooks/api/products"
import { sdk } from "src/lib/client"
import { queryClient } from "src/lib/query-client"

const salesChannelDetailQuery = (id: string) => ({
  queryKey: productsQueryKeys.detail(id),
  queryFn: async () => sdk.admin.salesChannel.retrieve(id),
})

export const salesChannelLoader = async ({ params }: LoaderFunctionArgs) => {
  const id = params.id
  const query = salesChannelDetailQuery(id!)

  return queryClient.ensureQueryData(query)
}
