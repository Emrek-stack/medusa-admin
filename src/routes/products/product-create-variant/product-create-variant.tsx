import { useParams } from "react-router-dom"
import { RouteFocusModal } from "src/components/modals"
import { useProduct } from "src/hooks/api/products"
import { CreateProductVariantForm } from "src/routes/products/product-create-variant/components/create-product-variant-form"

export const ProductCreateVariant = () => {
  const { id } = useParams()

  const { product, isLoading, isError, error } = useProduct(id!, {
    // TODO: Remove exclusion once we avoid including unnecessary relations by default in the query config
    fields: "-type,-collection,-tags,-images,-variants,-sales_channels",
  })

  if (isError) {
    throw error
  }

  return (
    <RouteFocusModal>
      {!isLoading && product && <CreateProductVariantForm product={product} />}
    </RouteFocusModal>
  )
}
