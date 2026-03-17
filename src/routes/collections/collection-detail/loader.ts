import { LoaderFunctionArgs } from "react-router-dom"

import { collectionsQueryKeys } from "src/hooks/api/collections"
import { sdk } from "src/lib/client"
import { queryClient } from "src/lib/query-client"

const collectionDetailQuery = (id: string) => ({
  queryKey: collectionsQueryKeys.detail(id),
  queryFn: async () => sdk.admin.productCollection.retrieve(id),
})

export const collectionLoader = async ({ params }: LoaderFunctionArgs) => {
  const id = params.id
  const query = collectionDetailQuery(id!)

  return queryClient.ensureQueryData(query)
}
