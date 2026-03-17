import { Heading } from "@medusajs/ui"
import { useTranslation } from "react-i18next"
import { useParams } from "react-router-dom"
import { RouteDrawer } from "src/components/modals"
import { VisuallyHidden } from "src/components/utilities/visually-hidden"
import { useApiKey } from "src/hooks/api/api-keys"
import { EditApiKeyForm } from "src/routes/api-key-management/api-key-management-edit/components/edit-api-key-form"

export const ApiKeyManagementEdit = () => {
  const { id } = useParams()
  const { t } = useTranslation()

  const { api_key, isLoading, isError, error } = useApiKey(id!)

  if (isError) {
    throw error
  }

  return (
    <RouteDrawer>
      <RouteDrawer.Header>
        <RouteDrawer.Title asChild>
          <Heading>{t("apiKeyManagement.edit.header")}</Heading>
        </RouteDrawer.Title>
        <RouteDrawer.Description asChild>
          <VisuallyHidden>
            {t("apiKeyManagement.edit.description")}
          </VisuallyHidden>
        </RouteDrawer.Description>
      </RouteDrawer.Header>
      {!isLoading && !!api_key && <EditApiKeyForm apiKey={api_key} />}
    </RouteDrawer>
  )
}
