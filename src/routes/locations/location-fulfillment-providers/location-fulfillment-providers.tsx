import { useParams } from "react-router-dom"

import { RouteFocusModal } from "src/components/modals"
import { useStockLocation } from "src/hooks/api/stock-locations"
import { LocationEditFulfillmentProvidersForm } from "src/routes/locations/location-fulfillment-providers/components/edit-fulfillment-providers-form"

export const LocationFulfillmentProviders = () => {
  const { location_id } = useParams()
  const { stock_location, isPending, isError, error } = useStockLocation(
    location_id!,
    { fields: "id,*fulfillment_providers" }
  )

  const ready = !isPending && !!stock_location

  if (isError) {
    throw error
  }

  return (
    <RouteFocusModal>
      {ready && (
        <LocationEditFulfillmentProvidersForm location={stock_location} />
      )}
    </RouteFocusModal>
  )
}
