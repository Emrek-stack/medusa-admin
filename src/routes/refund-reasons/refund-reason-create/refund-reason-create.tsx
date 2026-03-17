import { RouteFocusModal } from "src/components/modals"
import { RefundReasonCreateForm } from "src/routes/refund-reasons/refund-reason-create/components/refund-reason-create-form"

export const RefundReasonCreate = () => {
  return (
    <RouteFocusModal>
      <RefundReasonCreateForm />
    </RouteFocusModal>
  )
}