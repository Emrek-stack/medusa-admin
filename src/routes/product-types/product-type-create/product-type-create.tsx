import { RouteFocusModal } from "src/components/modals"
import { CreateProductTypeForm } from "src/routes/product-types/product-type-create/components/create-product-type-form"

export const ProductTypeCreate = () => {
  return (
    <RouteFocusModal>
      <CreateProductTypeForm />
    </RouteFocusModal>
  )
}
