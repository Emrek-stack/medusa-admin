import { LoaderFunctionArgs } from "react-router-dom"
import { productsQueryKeys } from "src/hooks/api/products"
import { sdk } from "src/lib/client"
import { queryClient } from "src/lib/query-client"
import { CUSTOMER_GROUP_DETAIL_FIELDS } from "src/routes/customer-groups/customer-group-detail/constants"

const customerGroupDetailQuery = (id: string) => ({
  queryKey: productsQueryKeys.detail(id),
  queryFn: async () =>
    sdk.admin.customerGroup.retrieve(id, {
      fields: CUSTOMER_GROUP_DETAIL_FIELDS,
    }),
})

export const customerGroupLoader = async ({ params }: LoaderFunctionArgs) => {
  const id = params.id
  const query = customerGroupDetailQuery(id!)

  return queryClient.ensureQueryData(query)
}
