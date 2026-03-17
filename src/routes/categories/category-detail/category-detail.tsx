import { useLoaderData, useParams } from "react-router-dom"
import { useProductCategory } from "src/hooks/api/categories"
import { CategoryGeneralSection } from "src/routes/categories/category-detail/components/category-general-section"
import { CategoryOrganizeSection } from "src/routes/categories/category-detail/components/category-organize-section"
import { CategoryProductSection } from "src/routes/categories/category-detail/components/category-product-section"
import { categoryLoader } from "src/routes/categories/category-detail/loader"

import { TwoColumnPageSkeleton } from "src/components/common/skeleton"
import { TwoColumnPage } from "src/components/layout/pages"
import { useExtension } from "src/providers/extension-provider"

export const CategoryDetail = () => {
  const { id } = useParams()

  const initialData = useLoaderData() as Awaited<
    ReturnType<typeof categoryLoader>
  >

  const { getWidgets } = useExtension()

  const { product_category, isLoading, isError, error } = useProductCategory(
    id!,
    undefined,
    {
      initialData,
    }
  )

  if (isLoading || !product_category) {
    return (
      <TwoColumnPageSkeleton
        mainSections={2}
        sidebarSections={1}
        showJSON
        showMetadata
      />
    )
  }

  if (isError) {
    throw error
  }

  return (
    <TwoColumnPage
      widgets={{
        after: getWidgets("product_category.details.after"),
        before: getWidgets("product_category.details.before"),
        sideAfter: getWidgets("product_category.details.side.after"),
        sideBefore: getWidgets("product_category.details.side.before"),
      }}
      showJSON
      showMetadata
      data={product_category}
    >
      <TwoColumnPage.Main>
        <CategoryGeneralSection category={product_category} />
        <CategoryProductSection category={product_category} />
      </TwoColumnPage.Main>
      <TwoColumnPage.Sidebar>
        <CategoryOrganizeSection category={product_category} />
      </TwoColumnPage.Sidebar>
    </TwoColumnPage>
  )
}
