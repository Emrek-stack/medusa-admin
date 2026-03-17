import { LoaderFunctionArgs } from "react-router-dom"
import { reservationItemsQueryKeys } from "src/hooks/api/reservations"
import { sdk } from "src/lib/client"
import { queryClient } from "src/lib/query-client"

const reservationDetailQuery = (id: string) => ({
  queryKey: reservationItemsQueryKeys.detail(id),
  queryFn: async () => sdk.admin.reservation.retrieve(id),
})

export const reservationItemLoader = async ({ params }: LoaderFunctionArgs) => {
  const id = params.id
  const query = reservationDetailQuery(id!)

  return queryClient.ensureQueryData(query)
}
