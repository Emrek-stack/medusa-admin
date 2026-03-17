import { useParams } from "react-router-dom"

import { usePriceList } from "src/hooks/api/price-lists"
import { PriceListConfigurationSection } from "src/routes/price-lists/price-list-detail/components/price-list-configuration-section"
import { PriceListGeneralSection } from "src/routes/price-lists/price-list-detail/components/price-list-general-section"
import { PriceListProductSection } from "src/routes/price-lists/price-list-detail/components/price-list-product-section"

import { TwoColumnPageSkeleton } from "src/components/common/skeleton"
import { TwoColumnPage } from "src/components/layout/pages"
import { useExtension } from "src/providers/extension-provider"

export const PriceListDetails = () => {
  const { id } = useParams()

  const { price_list, isLoading, isError, error } = usePriceList(id!)
  const { getWidgets } = useExtension()

  if (isLoading || !price_list) {
    return (
      <TwoColumnPageSkeleton mainSections={2} sidebarSections={1} showJSON />
    )
  }

  if (isError) {
    throw error
  }

  return (
    <TwoColumnPage
      widgets={{
        after: getWidgets("price_list.details.after"),
        before: getWidgets("price_list.details.before"),
        sideAfter: getWidgets("price_list.details.side.after"),
        sideBefore: getWidgets("price_list.details.side.before"),
      }}
      data={price_list}
      showJSON
    >
      <TwoColumnPage.Main>
        <PriceListGeneralSection priceList={price_list} />
        <PriceListProductSection priceList={price_list} />
      </TwoColumnPage.Main>
      <TwoColumnPage.Sidebar>
        <PriceListConfigurationSection priceList={price_list} />
      </TwoColumnPage.Sidebar>
    </TwoColumnPage>
  )
}
