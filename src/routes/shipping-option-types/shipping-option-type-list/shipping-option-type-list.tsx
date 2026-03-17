import { SingleColumnPage } from "src/components/layout/pages"
import { useExtension } from "src/providers/extension-provider"
import { ShippingOptionTypeListTable } from "src/routes/shipping-option-types/shipping-option-type-list/components/shipping-option-type-list-table"

export const ShippingOptionTypeList = () => {
  const { getWidgets } = useExtension()

  return (
    <SingleColumnPage
      widgets={{
        after: getWidgets("shipping_option_type.list.after"),
        before: getWidgets("shipping_option_type.list.before"),
      }}
    >
      <ShippingOptionTypeListTable />
    </SingleColumnPage>
  )
}
