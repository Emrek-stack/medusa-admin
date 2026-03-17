import { useLoaderData, useParams } from "react-router-dom"

import { SingleColumnPage } from "src/components/layout/pages"
import { useCustomerGroup } from "src/hooks/api/customer-groups"
import { CustomerGroupCustomerSection } from "src/routes/customer-groups/customer-group-detail/components/customer-group-customer-section"
import { CustomerGroupGeneralSection } from "src/routes/customer-groups/customer-group-detail/components/customer-group-general-section"
import { customerGroupLoader } from "src/routes/customer-groups/customer-group-detail/loader"

import { SingleColumnPageSkeleton } from "src/components/common/skeleton"
import { useExtension } from "src/providers/extension-provider"
import { CUSTOMER_GROUP_DETAIL_FIELDS } from "src/routes/customer-groups/customer-group-detail/constants"

export const CustomerGroupDetail = () => {
  const initialData = useLoaderData() as Awaited<
    ReturnType<typeof customerGroupLoader>
  >

  const { id } = useParams()
  const { customer_group, isLoading, isError, error } = useCustomerGroup(
    id!,
    {
      fields: CUSTOMER_GROUP_DETAIL_FIELDS,
    },
    { initialData }
  )

  const { getWidgets } = useExtension()

  if (isLoading || !customer_group) {
    return <SingleColumnPageSkeleton sections={2} showJSON showMetadata />
  }

  if (isError) {
    throw error
  }

  return (
    <SingleColumnPage
      widgets={{
        before: getWidgets("customer_group.details.before"),
        after: getWidgets("customer_group.details.after"),
      }}
      showJSON
      showMetadata
      data={customer_group}
    >
      <CustomerGroupGeneralSection group={customer_group} />
      <CustomerGroupCustomerSection group={customer_group} />
    </SingleColumnPage>
  )
}
