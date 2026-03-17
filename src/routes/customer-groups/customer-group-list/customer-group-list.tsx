import { SingleColumnPage } from "src/components/layout/pages"
import { useExtension } from "src/providers/extension-provider"
import { CustomerGroupListTable } from "src/routes/customer-groups/customer-group-list/components/customer-group-list-table"

export const CustomerGroupsList = () => {
  const { getWidgets } = useExtension()

  return (
    <SingleColumnPage
      widgets={{
        after: getWidgets("customer_group.list.after"),
        before: getWidgets("customer_group.list.before"),
      }}
    >
      <CustomerGroupListTable />
    </SingleColumnPage>
  )
}
