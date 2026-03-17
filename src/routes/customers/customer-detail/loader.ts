import { LoaderFunctionArgs } from "react-router-dom"
import { productsQueryKeys } from "src/hooks/api/products"
import { sdk } from "src/lib/client"
import { queryClient } from "src/lib/query-client"

const customerDetailQuery = (id: string) => ({
  queryKey: productsQueryKeys.detail(id),
  queryFn: async () =>
    sdk.admin.customer.retrieve(id, {
      fields: "+*addresses",
    }),
})

export const customerLoader = async ({ params }: LoaderFunctionArgs) => {
  const id = params.id
  const query = customerDetailQuery(id!)

  return queryClient.ensureQueryData(query)
}
