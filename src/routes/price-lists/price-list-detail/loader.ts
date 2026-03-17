import { LoaderFunctionArgs } from "react-router-dom"
import { priceListsQueryKeys } from "src/hooks/api/price-lists"
import { sdk } from "src/lib/client"
import { queryClient } from "src/lib/query-client"

const pricingDetailQuery = (id: string) => ({
  queryKey: priceListsQueryKeys.detail(id),
  queryFn: async () => sdk.admin.priceList.retrieve(id),
})

export const pricingLoader = async ({ params }: LoaderFunctionArgs) => {
  const id = params.id
  const query = pricingDetailQuery(id!)

  return queryClient.ensureQueryData(query)
}
