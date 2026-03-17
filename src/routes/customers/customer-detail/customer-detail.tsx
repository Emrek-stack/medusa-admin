import { useLoaderData, useParams } from "react-router-dom"

import { SingleColumnPageSkeleton } from "src/components/common/skeleton"
import { TwoColumnPage } from "src/components/layout/pages"
import { useCustomer } from "src/hooks/api/customers"
import { useExtension } from "src/providers/extension-provider"
import { CustomerAddressSection } from "src/routes/customers/customer-detail/components/customer-address-section/customer-address-section"
import { CustomerGeneralSection } from "src/routes/customers/customer-detail/components/customer-general-section"
import { CustomerGroupSection } from "src/routes/customers/customer-detail/components/customer-group-section"
import { CustomerOrderSection } from "src/routes/customers/customer-detail/components/customer-order-section"
import { customerLoader } from "src/routes/customers/customer-detail/loader"

export const CustomerDetail = () => {
  const { id } = useParams()

  const initialData = useLoaderData() as Awaited<
    ReturnType<typeof customerLoader>
  >
  const { customer, isLoading, isError, error } = useCustomer(
    id!,
    { fields: "+*addresses" },
    { initialData }
  )

  const { getWidgets } = useExtension()

  if (isLoading || !customer) {
    return <SingleColumnPageSkeleton sections={2} showJSON showMetadata />
  }

  if (isError) {
    throw error
  }

  return (
    <TwoColumnPage
      widgets={{
        before: getWidgets("customer.details.before"),
        after: getWidgets("customer.details.after"),
        sideAfter: getWidgets("customer.details.side.after"),
        sideBefore: getWidgets("customer.details.side.before"),
      }}
      data={customer}
      hasOutlet
      showJSON
      showMetadata
    >
      <TwoColumnPage.Main>
        <CustomerGeneralSection customer={customer} />
        <CustomerOrderSection customer={customer} />
        <CustomerGroupSection customer={customer} />
      </TwoColumnPage.Main>
      <TwoColumnPage.Sidebar>
        <CustomerAddressSection customer={customer} />
      </TwoColumnPage.Sidebar>
    </TwoColumnPage>
  )
}
