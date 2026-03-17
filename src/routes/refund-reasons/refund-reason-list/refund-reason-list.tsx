import { SingleColumnPage } from "src/components/layout/pages"
import { useExtension } from "src/providers/extension-provider"
import { RefundReasonListTable } from "src/routes/refund-reasons/refund-reason-list/components/refund-reason-list-table"

export const RefundReasonList = () => {
  const { getWidgets } = useExtension()

  return (
    <SingleColumnPage
      showMetadata={false}
      showJSON={false}
      hasOutlet
      widgets={{
        after: getWidgets("refund_reason.list.after"),
        before: getWidgets("refund_reason.list.before"),
      }}
    >
      <RefundReasonListTable />
    </SingleColumnPage>
  )
}
