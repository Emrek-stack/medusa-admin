import { RouteFocusModal } from "src/components/modals"
import { CreateShippingOptionTypeForm } from "src/routes/shipping-option-types/shipping-option-type-create/components/create-shipping-option-type-form"

export const ShippingOptionTypeCreate = () => {
  return (
    <RouteFocusModal>
      <CreateShippingOptionTypeForm />
    </RouteFocusModal>
  )
}
