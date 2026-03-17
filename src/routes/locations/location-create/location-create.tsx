import { RouteFocusModal } from "src/components/modals"
import { CreateLocationForm } from "src/routes/locations/location-create/components/create-location-form"

export const LocationCreate = () => {
  return (
    <RouteFocusModal>
      <CreateLocationForm />
    </RouteFocusModal>
  )
}
