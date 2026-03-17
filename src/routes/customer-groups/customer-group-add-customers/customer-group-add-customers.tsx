import { useParams } from "react-router-dom"
import { RouteFocusModal } from "src/components/modals"
import { AddCustomersForm } from "src/routes/customer-groups/customer-group-add-customers/components/add-customers-form"

export const CustomerGroupAddCustomers = () => {
  const { id } = useParams()

  return (
    <RouteFocusModal>
      <AddCustomersForm customerGroupId={id!} />
    </RouteFocusModal>
  )
}
