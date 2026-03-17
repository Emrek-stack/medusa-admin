import { SingleColumnPage } from "src/components/layout/pages"
import { useExtension } from "src/providers/extension-provider"
import { ProductListTable } from "src/routes/products/product-list/components/product-list-table"

export const ProductList = () => {
  const { getWidgets } = useExtension()

  return (
    <SingleColumnPage
      widgets={{
        after: getWidgets("product.list.after"),
        before: getWidgets("product.list.before"),
      }}
    >
      <ProductListTable />
    </SingleColumnPage>
  )
}
