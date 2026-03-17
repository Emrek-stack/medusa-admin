import { Heading } from "@medusajs/ui"
import { useTranslation } from "react-i18next"
import { useParams } from "react-router-dom"
import { RouteDrawer } from "src/components/modals"
import { useCustomer } from "src/hooks/api/customers"
import { EditCustomerForm } from "src/routes/customers/customer-edit/components/edit-customer-form"

export const CustomerEdit = () => {
  const { t } = useTranslation()

  const { id } = useParams()
  const { customer, isLoading, isError, error } = useCustomer(id!)

  if (isError) {
    throw error
  }

  return (
    <RouteDrawer>
      <RouteDrawer.Header>
        <RouteDrawer.Title asChild>
          <Heading>{t("customers.edit.header")}</Heading>
        </RouteDrawer.Title>
      </RouteDrawer.Header>
      {!isLoading && customer && <EditCustomerForm customer={customer} />}
    </RouteDrawer>
  )
}
