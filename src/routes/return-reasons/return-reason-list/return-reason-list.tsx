import { SingleColumnPage } from "src/components/layout/pages"
import { useExtension } from "src/providers/extension-provider"
import { ReturnReasonListTable } from "src/routes/return-reasons/return-reason-list/components/return-reason-list-table"

export const ReturnReasonList = () => {
  const { getWidgets } = useExtension()

  return (
    <SingleColumnPage
      showMetadata={false}
      showJSON={false}
      hasOutlet
      widgets={{
        after: getWidgets("return_reason.list.after"),
        before: getWidgets("return_reason.list.before"),
      }}
    >
      <ReturnReasonListTable />
    </SingleColumnPage>
  )
}
