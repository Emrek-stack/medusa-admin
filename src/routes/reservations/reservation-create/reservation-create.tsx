import { useSearchParams } from "react-router-dom"

import { RouteFocusModal } from "src/components/modals"
import { ReservationCreateForm } from "src/routes/reservations/reservation-create/components/reservation-create-from"

export const ReservationCreate = () => {
  const [params] = useSearchParams()

  const inventoryItemId = params.get("item_id")

  return (
    <RouteFocusModal>
      <ReservationCreateForm inventoryItemId={inventoryItemId} />
    </RouteFocusModal>
  )
}
