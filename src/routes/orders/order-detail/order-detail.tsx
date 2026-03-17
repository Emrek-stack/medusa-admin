import { useLoaderData, useParams } from "react-router-dom"

import { TwoColumnPageSkeleton } from "src/components/common/skeleton"
import { TwoColumnPage } from "src/components/layout/pages"
import { useOrder, useOrderPreview } from "src/hooks/api/orders"
import { usePlugins } from "src/hooks/api/plugins"
import { useExtension } from "src/providers/extension-provider"
import { ActiveOrderClaimSection } from "src/routes/orders/order-detail/components/active-order-claim-section"
import { ActiveOrderExchangeSection } from "src/routes/orders/order-detail/components/active-order-exchange-section"
import { ActiveOrderReturnSection } from "src/routes/orders/order-detail/components/active-order-return-section"
import { OrderActiveEditSection } from "src/routes/orders/order-detail/components/order-active-edit-section"
import { OrderActivitySection } from "src/routes/orders/order-detail/components/order-activity-section"
import { OrderCustomerSection } from "src/routes/orders/order-detail/components/order-customer-section"
import { OrderFulfillmentSection } from "src/routes/orders/order-detail/components/order-fulfillment-section"
import { OrderGeneralSection } from "src/routes/orders/order-detail/components/order-general-section"
import { OrderPaymentSection } from "src/routes/orders/order-detail/components/order-payment-section"
import { OrderSummarySection } from "src/routes/orders/order-detail/components/order-summary-section"
import { DEFAULT_FIELDS } from "src/routes/orders/order-detail/constants"
import { orderLoader } from "src/routes/orders/order-detail/loader"

export const OrderDetail = () => {
  const initialData = useLoaderData() as Awaited<ReturnType<typeof orderLoader>>

  const { id } = useParams()
  const { getWidgets } = useExtension()
  const { plugins = [] } = usePlugins()

  const { order, isLoading, isError, error } = useOrder(
    id!,
    {
      fields: DEFAULT_FIELDS,
    },
    {
      initialData,
    }
  )

  // TODO: Retrieve endpoints don't have an order ability, so a JS sort until this is available
  if (order) {
    order.items = order.items.sort((itemA, itemB) => {
      if (itemA.created_at > itemB.created_at) {
        return 1
      }

      if (itemA.created_at < itemB.created_at) {
        return -1
      }

      return 0
    })
  }

  const { order: orderPreview, isLoading: isPreviewLoading } = useOrderPreview(
    id!
  )

  if (isLoading || !order || isPreviewLoading) {
    return (
      <TwoColumnPageSkeleton mainSections={4} sidebarSections={2} showJSON />
    )
  }

  if (isError) {
    throw error
  }

  return (
    <TwoColumnPage
      widgets={{
        after: getWidgets("order.details.after"),
        before: getWidgets("order.details.before"),
        sideAfter: getWidgets("order.details.side.after"),
        sideBefore: getWidgets("order.details.side.before"),
      }}
      data={order}
      showJSON
      showMetadata
      hasOutlet
    >
      <TwoColumnPage.Main>
        <OrderActiveEditSection order={order} />
        <ActiveOrderClaimSection orderPreview={orderPreview!} />
        <ActiveOrderExchangeSection orderPreview={orderPreview!} />
        <ActiveOrderReturnSection orderPreview={orderPreview!} />
        <OrderGeneralSection order={order} />
        <OrderSummarySection order={order} plugins={plugins} />
        <OrderPaymentSection order={order} plugins={plugins} />
        <OrderFulfillmentSection order={order} />
      </TwoColumnPage.Main>
      <TwoColumnPage.Sidebar>
        <OrderCustomerSection order={order} />
        <OrderActivitySection order={order} />
      </TwoColumnPage.Sidebar>
    </TwoColumnPage>
  )
}
