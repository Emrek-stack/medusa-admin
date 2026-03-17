import { useTranslation } from "react-i18next"
import { useParams } from "react-router-dom"
import { RouteFocusModal } from "src/components/modals"
import { useProduct } from "src/hooks/api/products"
import { ProductMediaView } from "src/routes/products/product-media/components/product-media-view"

export const ProductMedia = () => {
  const { t } = useTranslation()
  const { id } = useParams()

  const { product, isLoading, isError, error } = useProduct(id!, {
    // TODO: Remove exclusion once we avoid including unnecessary relations by default in the query config
    fields: "-type,-collection,-options,-tags,-variants,-sales_channels",
  })

  const ready = !isLoading && product

  if (isError) {
    throw error
  }

  return (
    <RouteFocusModal>
      <RouteFocusModal.Title asChild>
        <span className="sr-only">{t("products.media.label")}</span>
      </RouteFocusModal.Title>
      <RouteFocusModal.Description asChild>
        <span className="sr-only">{t("products.media.editHint")}</span>
      </RouteFocusModal.Description>
      {ready && <ProductMediaView product={product} />}
    </RouteFocusModal>
  )
}
