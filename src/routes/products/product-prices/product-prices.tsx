import { useParams } from "react-router-dom"

import { RouteFocusModal } from "src/components/modals"
import { useProduct } from "src/hooks/api/products"
import { PricingEdit } from "src/routes/products/product-prices/pricing-edit"

export const ProductPrices = () => {
  const { id, variant_id } = useParams()

  const { product, isLoading, isError, error } = useProduct(id!, {
    // TODO: Remove exclusion once we avoid including unnecessary relations by default in the query config
    fields: "-type,-collection,-options,-tags,-images,-sales_channels",
  })

  if (isError) {
    throw error
  }

  return (
    <RouteFocusModal>
      {!isLoading && product && (
        <PricingEdit product={product} variantId={variant_id} />
      )}
    </RouteFocusModal>
  )
}
