import { Heading } from "@medusajs/ui"
import { useTranslation } from "react-i18next"
import { useParams } from "react-router-dom"

import { RouteDrawer } from "src/components/modals"
import { useOrder } from "src/hooks/api"
import { DEFAULT_FIELDS } from "src/routes/orders/order-detail/constants"
import { EditOrderShippingAddressForm } from "src/routes/orders/order-edit-shipping-address/components/edit-order-shipping-address-form"

export const OrderEditShippingAddress = () => {
  const { t } = useTranslation()
  const params = useParams()

  const { order, isPending, isError } = useOrder(params.id!, {
    fields: DEFAULT_FIELDS,
  })

  if (!isPending && isError) {
    throw new Error("Order not found")
  }

  return (
    <RouteDrawer>
      <RouteDrawer.Header>
        <Heading>{t("orders.edit.shippingAddress.title")}</Heading>
      </RouteDrawer.Header>

      {order && <EditOrderShippingAddressForm order={order} />}
    </RouteDrawer>
  )
}
