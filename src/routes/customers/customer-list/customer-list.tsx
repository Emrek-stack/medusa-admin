import { SingleColumnPage } from "src/components/layout/pages"
import { useExtension } from "src/providers/extension-provider"
import { CustomerListTable } from "src/routes/customers/customer-list/components/customer-list-table"

export const CustomersList = () => {
  const { getWidgets } = useExtension()

  return (
    <SingleColumnPage
      widgets={{
        after: getWidgets("customer.list.after"),
        before: getWidgets("customer.list.before"),
      }}
    >
      <CustomerListTable />
    </SingleColumnPage>
  )
}
