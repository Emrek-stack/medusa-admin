import { RouteFocusModal } from "src/components/modals"
import { CreateSalesChannelForm } from "src/routes/sales-channels/sales-channel-create/components/create-sales-channel-form"

export const SalesChannelCreate = () => {
  return (
    <RouteFocusModal>
      <CreateSalesChannelForm />
    </RouteFocusModal>
  )
}
