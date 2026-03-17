import { RouteFocusModal } from "src/components/modals"
import { TaxRegionCreateForm } from "src/routes/tax-regions/tax-region-create/components/tax-region-create-form"

export const TaxRegionCreate = () => {
  return (
    <RouteFocusModal>
      <TaxRegionCreateForm />
    </RouteFocusModal>
  )
}
