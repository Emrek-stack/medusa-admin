import { RouteFocusModal } from "src/components/modals"
import { CreateCustomerAddressForm } from "src/routes/customers/customer-create-address/components/create-customer-address-form"

export const CustomerCreateAddress = () => {
  return (
    <RouteFocusModal>
      <CreateCustomerAddressForm />
    </RouteFocusModal>
  )
}
