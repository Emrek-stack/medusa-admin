import { LoaderFunctionArgs } from "react-router-dom"

import { stockLocationsQueryKeys } from "src/hooks/api/stock-locations"
import { sdk } from "src/lib/client"
import { queryClient } from "src/lib/query-client"
import { LOCATION_DETAILS_FIELD } from "src/routes/locations/location-detail/constants"

const locationQuery = (id: string) => ({
  queryKey: stockLocationsQueryKeys.detail(id, {
    fields: LOCATION_DETAILS_FIELD,
  }),
  queryFn: async () =>
    sdk.admin.stockLocation.retrieve(id, {
      fields: LOCATION_DETAILS_FIELD,
    }),
})

export const locationLoader = async ({ params }: LoaderFunctionArgs) => {
  const id = params.location_id
  const query = locationQuery(id!)

  return queryClient.ensureQueryData(query)
}
