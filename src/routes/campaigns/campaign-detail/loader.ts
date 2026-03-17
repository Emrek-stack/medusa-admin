import { LoaderFunctionArgs } from "react-router-dom"

import { campaignsQueryKeys } from "src/hooks/api/campaigns"
import { sdk } from "src/lib/client"
import { queryClient } from "src/lib/query-client"
import { CAMPAIGN_DETAIL_FIELDS } from "src/routes/campaigns/campaign-detail/constants"

const campaignDetailQuery = (id: string) => ({
  queryKey: campaignsQueryKeys.detail(id),
  queryFn: async () =>
    sdk.admin.campaign.retrieve(id, {
      fields: CAMPAIGN_DETAIL_FIELDS,
    }),
})

export const campaignLoader = async ({ params }: LoaderFunctionArgs) => {
  const id = params.id
  const query = campaignDetailQuery(id!)

  return queryClient.ensureQueryData(query)
}
