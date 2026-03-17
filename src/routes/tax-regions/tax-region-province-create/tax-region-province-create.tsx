import { useParams } from "react-router-dom"
import { RouteFocusModal } from "src/components/modals"
import { useTaxRegion } from "src/hooks/api/tax-regions"
import { TaxRegionProvinceCreateForm } from "src/routes/tax-regions/tax-region-province-create/components/tax-region-province-create-form"

export const TaxProvinceCreate = () => {
  const { id } = useParams()

  const { tax_region, isPending, isError, error } = useTaxRegion(id!)

  const ready = !isPending && !!tax_region

  if (isError) {
    throw error
  }

  return (
    <RouteFocusModal>
      {ready && <TaxRegionProvinceCreateForm parent={tax_region} />}
    </RouteFocusModal>
  )
}
