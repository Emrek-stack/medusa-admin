import { useParams } from "react-router-dom"

import { RouteFocusModal } from "src/components/modals"
import { useOrder } from "src/hooks/api/orders"
import { OrderCreateShipmentForm } from "src/routes/orders/order-create-shipment/components/order-create-shipment-form"

export function OrderCreateShipment() {
  const { id, f_id } = useParams()

  const { order, isLoading, isError, error } = useOrder(id!, {
    fields: "*fulfillments,*fulfillments.items,*fulfillments.labels",
  })

  if (isError) {
    throw error
  }

  const ready = !isLoading && order

  return (
    <RouteFocusModal>
      {ready && (
        <OrderCreateShipmentForm
          order={order}
          fulfillment={order.fulfillments?.find((f) => f.id === f_id)}
        />
      )}
    </RouteFocusModal>
  )
}
