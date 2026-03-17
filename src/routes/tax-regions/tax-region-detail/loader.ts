import { LoaderFunctionArgs } from "react-router-dom"
import { taxRegionsQueryKeys } from "src/hooks/api/tax-regions"
import { sdk } from "src/lib/client"
import { queryClient } from "src/lib/query-client"

const taxRegionDetailQuery = (id: string) => ({
  queryKey: taxRegionsQueryKeys.detail(id),
  queryFn: async () => sdk.admin.taxRegion.retrieve(id),
})

export const taxRegionLoader = async ({ params }: LoaderFunctionArgs) => {
  const id = params.id
  const query = taxRegionDetailQuery(id!)

  return queryClient.ensureQueryData(query)
}
