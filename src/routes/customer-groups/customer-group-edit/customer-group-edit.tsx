import { Heading } from "@medusajs/ui"
import { useTranslation } from "react-i18next"
import { useParams } from "react-router-dom"
import { RouteDrawer } from "src/components/modals"
import { useCustomerGroup } from "src/hooks/api/customer-groups"
import { EditCustomerGroupForm } from "src/routes/customer-groups/customer-group-edit/components/edit-customer-group-form"

export const CustomerGroupEdit = () => {
  const { id } = useParams()
  const { customer_group, isLoading, isError, error } = useCustomerGroup(id!)

  const { t } = useTranslation()

  if (isError) {
    throw error
  }

  return (
    <RouteDrawer>
      <RouteDrawer.Header>
        <RouteDrawer.Title asChild>
          <Heading>{t("customerGroups.edit.header")}</Heading>
        </RouteDrawer.Title>
      </RouteDrawer.Header>
      {!isLoading && customer_group && (
        <EditCustomerGroupForm group={customer_group} />
      )}
    </RouteDrawer>
  )
}
