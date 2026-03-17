import { SalesChannelListTable } from "src/routes/sales-channels/sales-channel-list/components/sales-channel-list-table"

import { SingleColumnPage } from "src/components/layout/pages"
import { useExtension } from "src/providers/extension-provider"

export const SalesChannelList = () => {
  const { getWidgets } = useExtension()

  return (
    <SingleColumnPage
      widgets={{
        before: getWidgets("sales_channel.list.before"),
        after: getWidgets("sales_channel.list.after"),
      }}
      hasOutlet
    >
      <SalesChannelListTable />
    </SingleColumnPage>
  )
}
