import { LoaderFunctionArgs } from "react-router-dom"

import { productTypesQueryKeys } from "src/hooks/api/product-types"
import { sdk } from "src/lib/client"
import { queryClient } from "src/lib/query-client"

const productTypeDetailQuery = (id: string) => ({
  queryKey: productTypesQueryKeys.detail(id),
  queryFn: async () => sdk.admin.productType.retrieve(id),
})

export const productTypeLoader = async ({ params }: LoaderFunctionArgs) => {
  const id = params.id
  const query = productTypeDetailQuery(id!)

  return queryClient.ensureQueryData(query)
}
