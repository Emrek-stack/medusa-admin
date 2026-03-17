import { RouteFocusModal } from "src/components/modals"
import { ReturnReasonCreateForm } from "src/routes/return-reasons/return-reason-create/components/return-reason-create-form"

export const ReturnReasonCreate = () => {
  return (
    <RouteFocusModal>
      <ReturnReasonCreateForm />
    </RouteFocusModal>
  )
}
