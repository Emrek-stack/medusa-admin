import { useLoaderData, useParams } from "react-router-dom"

import { TwoColumnPageSkeleton } from "src/components/common/skeleton"
import { TwoColumnPage } from "src/components/layout/pages"
import { useInventoryItem } from "src/hooks/api"
import { useReservationItem } from "src/hooks/api/reservations"
import { useExtension } from "src/providers/extension-provider"
import { InventoryItemGeneralSection } from "src/routes/inventory/inventory-detail/components/inventory-item-general-section"
import { ReservationGeneralSection } from "src/routes/reservations/reservation-detail/components/reservation-general-section"
import { reservationItemLoader } from "src/routes/reservations/reservation-detail/loader"

export const ReservationDetail = () => {
  const { id } = useParams()

  const initialData = useLoaderData() as Awaited<
    ReturnType<typeof reservationItemLoader>
  >

  const { reservation, isLoading, isError, error } = useReservationItem(
    id!,
    undefined,
    {
      initialData,
    }
  )

  // TEMP: fetch directly since the fields are not populated with reservation call
  const { inventory_item } = useInventoryItem(
    reservation?.inventory_item?.id!,
    undefined,
    { enabled: !!reservation?.inventory_item?.id! }
  )

  const { getWidgets } = useExtension()

  if (isLoading || !reservation) {
    return (
      <TwoColumnPageSkeleton
        mainSections={1}
        sidebarSections={1}
        showJSON
        showMetadata
      />
    )
  }

  if (isError) {
    throw error
  }

  return (
    <TwoColumnPage
      widgets={{
        before: getWidgets("reservation.details.before"),
        after: getWidgets("reservation.details.after"),
        sideBefore: getWidgets("reservation.details.side.before"),
        sideAfter: getWidgets("reservation.details.side.after"),
      }}
      data={reservation}
      showJSON
      showMetadata
    >
      <TwoColumnPage.Main>
        <ReservationGeneralSection reservation={reservation} />
      </TwoColumnPage.Main>
      <TwoColumnPage.Sidebar>
        {inventory_item && (
          <InventoryItemGeneralSection inventoryItem={inventory_item} />
        )}
      </TwoColumnPage.Sidebar>
    </TwoColumnPage>
  )
}
