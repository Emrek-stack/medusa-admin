import { useLoaderData, useParams } from "react-router-dom"

import { useStockLocation } from "src/hooks/api/stock-locations"
import { LocationGeneralSection } from "src/routes/locations/location-detail/components/location-general-section"
import LocationsSalesChannelsSection from "src/routes/locations/location-detail/components/location-sales-channels-section/locations-sales-channels-section"
import { locationLoader } from "src/routes/locations/location-detail/loader"

import { TwoColumnPageSkeleton } from "src/components/common/skeleton"
import { TwoColumnPage } from "src/components/layout/pages"
import { useExtension } from "src/providers/extension-provider"
import LocationsFulfillmentProvidersSection from "src/routes/locations/location-detail/components/location-fulfillment-providers-section/location-fulfillment-providers-section"
import { LOCATION_DETAILS_FIELD } from "src/routes/locations/location-detail/constants"

export const LocationDetail = () => {
  const initialData = useLoaderData() as Awaited<
    ReturnType<typeof locationLoader>
  >

  const { location_id } = useParams()
  const {
    stock_location: location,
    isPending: isLoading,
    isError,
    error,
  } = useStockLocation(
    location_id!,
    { fields: LOCATION_DETAILS_FIELD },
    { initialData }
  )

  const { getWidgets } = useExtension()

  if (isLoading || !location) {
    return (
      <TwoColumnPageSkeleton mainSections={3} sidebarSections={2} showJSON />
    )
  }

  if (isError) {
    throw error
  }

  return (
    <TwoColumnPage
      widgets={{
        after: getWidgets("location.details.after"),
        before: getWidgets("location.details.before"),
        sideAfter: getWidgets("location.details.side.after"),
        sideBefore: getWidgets("location.details.side.before"),
      }}
      data={location}
      showJSON
      hasOutlet
    >
      <TwoColumnPage.Main>
        <LocationGeneralSection location={location} />
      </TwoColumnPage.Main>
      <TwoColumnPage.Sidebar>
        <LocationsSalesChannelsSection location={location} />
        <LocationsFulfillmentProvidersSection location={location} />
      </TwoColumnPage.Sidebar>
    </TwoColumnPage>
  )
}
