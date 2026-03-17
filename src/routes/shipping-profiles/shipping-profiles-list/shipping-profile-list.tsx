import { SingleColumnPage } from "src/components/layout/pages"
import { useExtension } from "src/providers/extension-provider"
import { ShippingProfileListTable } from "src/routes/shipping-profiles/shipping-profiles-list/components/shipping-profile-list-table"

export const ShippingProfileList = () => {
  const { getWidgets } = useExtension()

  return (
    <SingleColumnPage
      widgets={{
        before: getWidgets("shipping_profile.list.before"),
        after: getWidgets("shipping_profile.list.after"),
      }}
    >
      <ShippingProfileListTable />
    </SingleColumnPage>
  )
}
