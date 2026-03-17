import { SingleColumnPage } from "src/components/layout/pages"
import { useExtension } from "src/providers/extension-provider"
import { CollectionListTable } from "src/routes/collections/collection-list/components/collection-list-table"

export const CollectionList = () => {
  const { getWidgets } = useExtension()

  return (
    <SingleColumnPage
      widgets={{
        after: getWidgets("product_collection.list.after"),
        before: getWidgets("product_collection.list.before"),
      }}
    >
      <CollectionListTable />
    </SingleColumnPage>
  )
}
