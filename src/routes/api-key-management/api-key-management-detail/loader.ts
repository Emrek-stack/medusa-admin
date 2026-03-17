import { LoaderFunctionArgs } from "react-router-dom"

import { apiKeysQueryKeys } from "src/hooks/api/api-keys"
import { sdk } from "src/lib/client"
import { queryClient } from "src/lib/query-client"

const apiKeyDetailQuery = (id: string) => ({
  queryKey: apiKeysQueryKeys.detail(id),
  queryFn: async () => sdk.admin.apiKey.retrieve(id),
})

export const apiKeyLoader = async ({ params }: LoaderFunctionArgs) => {
  const id = params.id
  const query = apiKeyDetailQuery(id!)

  return queryClient.ensureQueryData(query)
}
