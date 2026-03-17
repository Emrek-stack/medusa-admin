import { SingleColumnPage } from "src/components/layout/pages"
import { useExtension } from "src/providers/extension-provider"
import { PriceListListTable } from "src/routes/price-lists/price-list-list/components/price-list-list-table"

export const PriceListList = () => {
  const { getWidgets } = useExtension()

  return (
    <SingleColumnPage
      widgets={{
        after: getWidgets("price_list.list.after"),
        before: getWidgets("price_list.list.before"),
      }}
    >
      <PriceListListTable />
    </SingleColumnPage>
  )
}
