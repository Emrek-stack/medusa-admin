import { useParams } from "react-router-dom"
import { RouteFocusModal } from "src/components/modals"
import { AddCustomerGroupsForm } from "src/routes/customers/customers-add-customer-group/components/add-customers-form"

export const CustomerAddCustomerGroups = () => {
  const { id } = useParams()

  return (
    <RouteFocusModal>
      <AddCustomerGroupsForm customerId={id!} />
    </RouteFocusModal>
  )
}
