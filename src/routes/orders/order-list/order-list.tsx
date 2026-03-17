import { OrderListTable } from "src/routes/orders/order-list/components/order-list-table"

import { SingleColumnPage } from "src/components/layout/pages"
import { useExtension } from "src/providers/extension-provider"

export const OrderList = () => {
  const { getWidgets } = useExtension()

  return (
    <SingleColumnPage
      widgets={{
        after: getWidgets("order.list.after"),
        before: getWidgets("order.list.before"),
      }}
      hasOutlet={false}
    >
      <OrderListTable />
    </SingleColumnPage>
  )
}
