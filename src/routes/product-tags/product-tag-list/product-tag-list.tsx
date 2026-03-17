import { SingleColumnPage } from "src/components/layout/pages"
import { useExtension } from "src/providers/extension-provider"
import { ProductTagListTable } from "src/routes/product-tags/product-tag-list/components/product-tag-list-table"

export const ProductTagList = () => {
  const { getWidgets } = useExtension()

  return (
    <SingleColumnPage
      showMetadata={false}
      showJSON={false}
      hasOutlet
      widgets={{
        after: getWidgets("product_tag.list.after"),
        before: getWidgets("product_tag.list.before"),
      }}
    >
      <ProductTagListTable />
    </SingleColumnPage>
  )
}
