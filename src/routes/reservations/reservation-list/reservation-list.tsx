import { SingleColumnPage } from "src/components/layout/pages"
import { useExtension } from "src/providers/extension-provider"
import { ReservationListTable } from "src/routes/reservations/reservation-list/components/reservation-list-table"

export const ReservationList = () => {
  const { getWidgets } = useExtension()

  return (
    <SingleColumnPage
      widgets={{
        before: getWidgets("reservation.list.before"),
        after: getWidgets("reservation.list.after"),
      }}
    >
      <ReservationListTable />
    </SingleColumnPage>
  )
}
