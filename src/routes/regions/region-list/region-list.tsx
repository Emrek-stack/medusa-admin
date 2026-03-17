import { SingleColumnPage } from "src/components/layout/pages"
import { useExtension } from "src/providers/extension-provider"
import { RegionListTable } from "src/routes/regions/region-list/components/region-list-table"

export const RegionList = () => {
  const { getWidgets } = useExtension()

  return (
    <SingleColumnPage
      widgets={{
        before: getWidgets("region.list.before"),
        after: getWidgets("region.list.after"),
      }}
    >
      <RegionListTable />
    </SingleColumnPage>
  )
}
