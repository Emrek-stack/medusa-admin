import { RouteFocusModal } from "src/components/modals"
import { CreateCustomerForm } from "src/routes/customers/customer-create/components/create-customer-form"

export const CustomerCreate = () => {
  return (
    <RouteFocusModal>
      <CreateCustomerForm />
    </RouteFocusModal>
  )
}
