import { SingleColumnPage } from "src/components/layout/pages"
import { useExtension } from "src/providers/extension-provider"
import { CategoryListTable } from "src/routes/categories/category-list/components/category-list-table"

export const CategoryList = () => {
  const { getWidgets } = useExtension()

  return (
    <SingleColumnPage
      widgets={{
        after: getWidgets("product_category.list.after"),
        before: getWidgets("product_category.list.before"),
      }}
      hasOutlet
    >
      <CategoryListTable />
    </SingleColumnPage>
  )
}
