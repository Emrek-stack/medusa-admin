import { SingleColumnPage } from "src/components/layout/pages"
import { useExtension } from "src/providers/extension-provider"
import { TaxRegionListView } from "src/routes/tax-regions/tax-region-list/components/tax-region-list-view"

export const TaxRegionsList = () => {
  const { getWidgets } = useExtension()

  return (
    <SingleColumnPage
      widgets={{
        before: getWidgets("tax.list.before"),
        after: getWidgets("tax.list.after"),
      }}
      hasOutlet
    >
      <TaxRegionListView />
    </SingleColumnPage>
  )
}
