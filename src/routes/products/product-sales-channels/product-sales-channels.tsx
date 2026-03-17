import { useParams } from "react-router-dom"

import { RouteFocusModal } from "src/components/modals"
import { useProduct } from "src/hooks/api/products"
import { EditSalesChannelsForm } from "src/routes/products/product-sales-channels/components/edit-sales-channels-form"

export const ProductSalesChannels = () => {
  const { id } = useParams()
  const { product, isLoading, isError, error } = useProduct(id!, {
    // TODO: Remove exclusion once we avoid including unnecessary relations by default in the query config
    fields: "-type,-collection,-options,-tags,-images,-variants",
  })

  if (isError) {
    throw error
  }

  return (
    <RouteFocusModal>
      {!isLoading && product && <EditSalesChannelsForm product={product} />}
    </RouteFocusModal>
  )
}
