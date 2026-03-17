import { useLoaderData, useParams } from "react-router-dom"

import { useProductVariant } from "src/hooks/api/products"

import { TwoColumnPageSkeleton } from "src/components/common/skeleton"
import { TwoColumnPage } from "src/components/layout/pages"
import { useExtension } from "src/providers/extension-provider"
import { VariantGeneralSection } from "src/routes/product-variants/product-variant-detail/components/variant-general-section"
import {
  InventorySectionPlaceholder,
  VariantInventorySection,
} from "src/routes/product-variants/product-variant-detail/components/variant-inventory-section"
import { VariantMediaSection } from "src/routes/product-variants/product-variant-detail/components/variant-media-section"
import { VariantPricesSection } from "src/routes/product-variants/product-variant-detail/components/variant-prices-section"
import { VARIANT_DETAIL_FIELDS } from "src/routes/product-variants/product-variant-detail/constants"
import { variantLoader } from "src/routes/product-variants/product-variant-detail/loader"

export const ProductVariantDetail = () => {
  const initialData = useLoaderData() as Awaited<
    ReturnType<typeof variantLoader>
  >

  const { id, variant_id } = useParams()
  const { variant, isLoading, isError, error } = useProductVariant(
    id!,
    variant_id!,
    { fields: VARIANT_DETAIL_FIELDS },
    {
      initialData,
    }
  )

  const { getWidgets } = useExtension()

  if (isLoading || !variant) {
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
      data={variant}
      hasOutlet
      showJSON
      showMetadata
      widgets={{
        after: getWidgets("product_variant.details.after"),
        before: getWidgets("product_variant.details.before"),
        sideAfter: getWidgets("product_variant.details.side.after"),
        sideBefore: getWidgets("product_variant.details.side.before"),
      }}
    >
      <TwoColumnPage.Main>
        <VariantGeneralSection variant={variant} />
        <VariantMediaSection variant={variant} />
        {!variant.manage_inventory ? (
          <InventorySectionPlaceholder />
        ) : (
          <VariantInventorySection
            inventoryItems={variant.inventory_items.map((i) => {
              return {
                ...i.inventory,
                required_quantity: i.required_quantity,
                variant,
              }
            })}
          />
        )}
      </TwoColumnPage.Main>
      <TwoColumnPage.Sidebar>
        <VariantPricesSection variant={variant} />
      </TwoColumnPage.Sidebar>
    </TwoColumnPage>
  )
}
