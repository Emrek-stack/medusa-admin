import { SingleColumnPage } from "src/components/layout/pages"
import { useExtension } from "src/providers/extension-provider"
import { ProductTypeListTable } from "src/routes/product-types/product-type-list/components/product-type-list-table"

export const ProductTypeList = () => {
  const { getWidgets } = useExtension()

  return (
    <SingleColumnPage
      widgets={{
        after: getWidgets("product_type.list.after"),
        before: getWidgets("product_type.list.before"),
      }}
    >
      <ProductTypeListTable />
    </SingleColumnPage>
  )
}
