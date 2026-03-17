import { LoaderFunctionArgs } from "react-router-dom"

import { productsQueryKeys } from "src/hooks/api/products"
import { sdk } from "src/lib/client"
import { queryClient } from "src/lib/query-client"

const userDetailQuery = (id: string) => ({
  queryKey: productsQueryKeys.detail(id),
  queryFn: async () => sdk.admin.user.retrieve(id),
})

export const userLoader = async ({ params }: LoaderFunctionArgs) => {
  const id = params.id
  const query = userDetailQuery(id!)

  return queryClient.ensureQueryData(query)
}
