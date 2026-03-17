import { LoaderFunctionArgs } from "react-router-dom"

import { productTagsQueryKeys } from "src/hooks/api"
import { sdk } from "src/lib/client"
import { queryClient } from "src/lib/query-client"

const productTagDetailQuery = (id: string) => ({
  queryKey: productTagsQueryKeys.detail(id),
  queryFn: async () => sdk.admin.productTag.retrieve(id),
})

export const productTagLoader = async ({ params }: LoaderFunctionArgs) => {
  const id = params.id
  const query = productTagDetailQuery(id!)

  return queryClient.ensureQueryData(query)
}
