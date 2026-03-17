import { useLoaderData, useParams } from "react-router-dom"

import { TwoColumnPageSkeleton } from "src/components/common/skeleton"
import { TwoColumnPage } from "src/components/layout/pages"
import { useProduct } from "src/hooks/api/products"
import { ProductAttributeSection } from "src/routes/products/product-detail/components/product-attribute-section"
import { ProductGeneralSection } from "src/routes/products/product-detail/components/product-general-section"
import { ProductMediaSection } from "src/routes/products/product-detail/components/product-media-section"
import { ProductOptionSection } from "src/routes/products/product-detail/components/product-option-section"
import { ProductOrganizationSection } from "src/routes/products/product-detail/components/product-organization-section"
import { ProductSalesChannelSection } from "src/routes/products/product-detail/components/product-sales-channel-section"
import { ProductVariantSection } from "src/routes/products/product-detail/components/product-variant-section"
import { PRODUCT_DETAIL_FIELDS } from "src/routes/products/product-detail/constants"
import { productLoader } from "src/routes/products/product-detail/loader"

import { useExtension } from "src/providers/extension-provider"
import { ProductShippingProfileSection } from "src/routes/products/product-detail/components/product-shipping-profile-section"

export const ProductDetail = () => {
  const initialData = useLoaderData() as Awaited<
    ReturnType<typeof productLoader>
  >

  const { id } = useParams()
  const { product, isLoading, isError, error } = useProduct(
    id!,
    { fields: PRODUCT_DETAIL_FIELDS },
    {
      initialData: initialData,
    }
  )

  const { getWidgets } = useExtension()

  const after = getWidgets("product.details.after")
  const before = getWidgets("product.details.before")
  const sideAfter = getWidgets("product.details.side.after")
  const sideBefore = getWidgets("product.details.side.before")

  if (isLoading || !product) {
    return (
      <TwoColumnPageSkeleton
        mainSections={4}
        sidebarSections={3}
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
        after,
        before,
        sideAfter,
        sideBefore,
      }}
      showJSON
      showMetadata
      data={product}
    >
      <TwoColumnPage.Main>
        <ProductGeneralSection product={product} />
        <ProductMediaSection product={product} />
        <ProductOptionSection product={product} />
        <ProductVariantSection product={product} />
      </TwoColumnPage.Main>
      <TwoColumnPage.Sidebar>
        <ProductSalesChannelSection product={product} />
        <ProductShippingProfileSection product={product} />
        <ProductOrganizationSection product={product} />
        <ProductAttributeSection product={product} />
      </TwoColumnPage.Sidebar>
    </TwoColumnPage>
  )
}
