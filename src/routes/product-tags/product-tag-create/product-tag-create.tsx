import { RouteFocusModal } from "src/components/modals"
import { ProductTagCreateForm } from "src/routes/product-tags/product-tag-create/components/product-tag-create-form"

export const ProductTagCreate = () => {
  return (
    <RouteFocusModal>
      <ProductTagCreateForm />
    </RouteFocusModal>
  )
}
