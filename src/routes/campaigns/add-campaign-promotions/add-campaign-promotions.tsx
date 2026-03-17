import { useParams } from "react-router-dom"
import { RouteFocusModal } from "src/components/modals"
import { useCampaign } from "src/hooks/api/campaigns"
import { AddCampaignPromotionsForm } from "src/routes/campaigns/add-campaign-promotions/components"

export const AddCampaignPromotions = () => {
  const { id } = useParams()
  const { campaign, isError, error } = useCampaign(id!)

  if (isError) {
    throw error
  }

  return (
    <RouteFocusModal>
      {campaign && <AddCampaignPromotionsForm campaign={campaign} />}
    </RouteFocusModal>
  )
}
