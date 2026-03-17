import { LoaderFunctionArgs } from "react-router-dom"

import { categoriesQueryKeys } from "src/hooks/api/categories"
import { sdk } from "src/lib/client"
import { queryClient } from "src/lib/query-client"

const categoryDetailQuery = (id: string) => ({
  queryKey: categoriesQueryKeys.detail(id),
  queryFn: async () => sdk.admin.productCategory.retrieve(id),
})

export const categoryLoader = async ({ params }: LoaderFunctionArgs) => {
  const id = params.id
  const query = categoryDetailQuery(id!)

  return queryClient.ensureQueryData(query)
}
