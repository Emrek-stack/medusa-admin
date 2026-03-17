import { useLoaderData, useParams } from "react-router-dom"

import { SingleColumnPageSkeleton } from "src/components/common/skeleton"
import { SingleColumnPage } from "src/components/layout/pages"
import { useProductType } from "src/hooks/api/product-types"
import { useExtension } from "src/providers/extension-provider"
import { ProductTypeGeneralSection } from "src/routes/product-types/product-type-detail/components/product-type-general-section"
import { ProductTypeProductSection } from "src/routes/product-types/product-type-detail/components/product-type-product-section"
import { productTypeLoader } from "src/routes/product-types/product-type-detail/loader"

export const ProductTypeDetail = () => {
  const { id } = useParams()
  const initialData = useLoaderData() as Awaited<
    ReturnType<typeof productTypeLoader>
  >

  const { product_type, isPending, isError, error } = useProductType(
    id!,
    undefined,
    {
      initialData,
    }
  )

  const { getWidgets } = useExtension()

  if (isPending || !product_type) {
    return <SingleColumnPageSkeleton sections={2} showJSON showMetadata />
  }

  if (isError) {
    throw error
  }

  return (
    <SingleColumnPage
      widgets={{
        after: getWidgets("product_type.details.after"),
        before: getWidgets("product_type.details.before"),
      }}
      showJSON
      showMetadata
      data={product_type}
    >
      <ProductTypeGeneralSection productType={product_type} />
      <ProductTypeProductSection productType={product_type} />
    </SingleColumnPage>
  )
}
