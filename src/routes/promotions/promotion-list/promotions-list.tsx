import { SingleColumnPage } from "src/components/layout/pages"
import { useExtension } from "src/providers/extension-provider"
import { PromotionListTable } from "src/routes/promotions/promotion-list/components/promotion-list-table"

export const PromotionsList = () => {
  const { getWidgets } = useExtension()

  return (
    <SingleColumnPage
      widgets={{
        before: getWidgets("promotion.list.before"),
        after: getWidgets("promotion.list.after"),
      }}
    >
      <PromotionListTable />
    </SingleColumnPage>
  )
}
