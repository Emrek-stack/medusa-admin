import { LoaderFunctionArgs } from "react-router-dom"
import { promotionsQueryKeys } from "src/hooks/api/promotions"
import { sdk } from "src/lib/client"
import { queryClient } from "src/lib/query-client"

const promotionDetailQuery = (id: string) => ({
  queryKey: promotionsQueryKeys.detail(id),
  queryFn: async () => sdk.admin.promotion.retrieve(id),
})

export const promotionLoader = async ({ params }: LoaderFunctionArgs) => {
  const id = params.id
  const query = promotionDetailQuery(id!)

  return queryClient.ensureQueryData(query)
}
