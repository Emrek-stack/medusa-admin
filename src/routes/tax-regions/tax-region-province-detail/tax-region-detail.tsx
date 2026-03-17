import { useLoaderData, useParams } from "react-router-dom"

import { SingleColumnPage } from "src/components/layout/pages"
import { useTaxRegion } from "src/hooks/api/tax-regions"
import { TaxRegionProvinceDetailSection } from "src/routes/tax-regions/tax-region-province-detail/components/tax-region-province-detail-section"

import { SingleColumnPageSkeleton } from "src/components/common/skeleton"
import { useExtension } from "src/providers/extension-provider"
import { TaxRegionProvinceOverrideSection } from "src/routes/tax-regions/tax-region-province-detail/components/tax-region-province-override-section"
import { taxRegionLoader } from "src/routes/tax-regions/tax-region-province-detail/loader"

export const TaxRegionDetail = () => {
  const { province_id } = useParams()

  const initialData = useLoaderData() as Awaited<
    ReturnType<typeof taxRegionLoader>
  >

  const {
    tax_region: taxRegion,
    isLoading,
    isError,
    error,
  } = useTaxRegion(province_id!, undefined, { initialData })

  const { getWidgets } = useExtension()

  if (isLoading || !taxRegion) {
    return <SingleColumnPageSkeleton sections={2} showJSON />
  }

  if (isError) {
    throw error
  }

  return (
    <SingleColumnPage
      data={taxRegion}
      showJSON
      widgets={{
        after: getWidgets("tax.details.after"),
        before: getWidgets("tax.details.before"),
      }}
    >
      <TaxRegionProvinceDetailSection taxRegion={taxRegion} />
      <TaxRegionProvinceOverrideSection taxRegion={taxRegion} />
    </SingleColumnPage>
  )
}
