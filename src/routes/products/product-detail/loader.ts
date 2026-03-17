import { LoaderFunctionArgs } from "react-router-dom"

import { productsQueryKeys } from "src/hooks/api/products"
import { sdk } from "src/lib/client"
import { queryClient } from "src/lib/query-client"
import { PRODUCT_DETAIL_FIELDS } from "src/routes/products/product-detail/constants"

const productDetailQuery = (id: string) => ({
  queryKey: productsQueryKeys.detail(id, { fields: PRODUCT_DETAIL_FIELDS }),
  queryFn: async () =>
    sdk.admin.product.retrieve(id, { fields: PRODUCT_DETAIL_FIELDS }),
})

export const productLoader = async ({ params }: LoaderFunctionArgs) => {
  const id = params.id
  const query = productDetailQuery(id!)

  const response = await queryClient.ensureQueryData({
    ...query,
    staleTime: 90000,
  })

  return response
}
