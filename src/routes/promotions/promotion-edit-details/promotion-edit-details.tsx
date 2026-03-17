import { Heading } from "@medusajs/ui"
import { useTranslation } from "react-i18next"
import { useParams } from "react-router-dom"

import { RouteDrawer } from "src/components/modals"
import { usePromotion } from "src/hooks/api/promotions"
import { EditPromotionDetailsForm } from "src/routes/promotions/promotion-edit-details/components/edit-promotion-form"

export const PromotionEditDetails = () => {
  const { id } = useParams()
  const { t } = useTranslation()

  const { promotion, isLoading, isError, error } = usePromotion(id!)

  if (isError) {
    throw error
  }

  return (
    <RouteDrawer>
      <RouteDrawer.Header>
        <Heading>{t("promotions.edit.title")}</Heading>
      </RouteDrawer.Header>

      {!isLoading && promotion && (
        <EditPromotionDetailsForm promotion={promotion} />
      )}
    </RouteDrawer>
  )
}
