import { RouteFocusModal } from "src/components/modals"
import { CreateShippingProfileForm } from "src/routes/shipping-profiles/shipping-profile-create/components/create-shipping-profile-form"

export function ShippingProfileCreate() {
  return (
    <RouteFocusModal>
      <CreateShippingProfileForm />
    </RouteFocusModal>
  )
}
