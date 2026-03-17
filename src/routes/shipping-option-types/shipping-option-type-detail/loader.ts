import { LoaderFunctionArgs } from "react-router-dom"

import { shippingOptionTypesQueryKeys } from "src/hooks/api/shipping-option-types"
import { sdk } from "src/lib/client"
import { queryClient } from "src/lib/query-client"

const shippingOptionTypeDetailQuery = (id: string) => ({
  queryKey: shippingOptionTypesQueryKeys.detail(id),
  queryFn: async () => sdk.admin.shippingOptionType.retrieve(id),
})

export const shippingOptionTypeLoader = async ({
  params,
}: LoaderFunctionArgs) => {
  const id = params.id
  const query = shippingOptionTypeDetailQuery(id!)

  return queryClient.ensureQueryData(query)
}
