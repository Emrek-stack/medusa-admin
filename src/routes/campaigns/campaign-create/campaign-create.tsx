import { RouteFocusModal } from "src/components/modals"
import { CreateCampaignForm } from "src/routes/campaigns/campaign-create/components/create-campaign-form"

export const CampaignCreate = () => {
  return (
    <RouteFocusModal>
      <CreateCampaignForm />
    </RouteFocusModal>
  )
}
