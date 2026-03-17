import { Heading } from "@medusajs/ui"
import { useTranslation } from "react-i18next"
import { useParams } from "react-router-dom"
import { RouteDrawer } from "src/components/modals"
import { useUser } from "src/hooks/api/users"
import { EditUserForm } from "src/routes/users/user-edit/components/edit-user-form"

export const UserEdit = () => {
  const { t } = useTranslation()
  const { id } = useParams()
  const { user, isPending: isLoading, isError, error } = useUser(id!)

  if (isError) {
    throw error
  }

  return (
    <RouteDrawer>
      <RouteDrawer.Header>
        <Heading>{t("users.editUser")}</Heading>
      </RouteDrawer.Header>
      {!isLoading && user && <EditUserForm user={user} />}
    </RouteDrawer>
  )
}
