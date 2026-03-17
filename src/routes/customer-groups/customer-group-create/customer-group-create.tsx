import { RouteFocusModal } from "src/components/modals"
import { CreateCustomerGroupForm } from "src/routes/customer-groups/customer-group-create/components/create-customer-group-form"

export const CustomerGroupCreate = () => {
  return (
    <RouteFocusModal>
      <CreateCustomerGroupForm />
    </RouteFocusModal>
  )
}
