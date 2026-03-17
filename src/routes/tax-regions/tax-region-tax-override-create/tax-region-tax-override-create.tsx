import { useParams } from "react-router-dom"
import { RouteFocusModal } from "src/components/modals"
import { useTaxRegion } from "src/hooks/api/tax-regions"
import { TaxRegionCreateTaxOverrideForm } from "src/routes/tax-regions/tax-region-tax-override-create/components/tax-region-override-create-form"

export const TaxRegionCreateTaxOverride = () => {
  const { id, province_id } = useParams()

  const { tax_region, isPending, isError, error } = useTaxRegion(
    province_id || id!
  )

  const ready = !isPending && !!tax_region

  if (isError) {
    throw error
  }

  return (
    <RouteFocusModal>
      {ready && <TaxRegionCreateTaxOverrideForm taxRegion={tax_region} />}
    </RouteFocusModal>
  )
}
