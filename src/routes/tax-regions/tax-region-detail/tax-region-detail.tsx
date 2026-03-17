import { useLoaderData, useParams } from "react-router-dom"
import { useState } from "react"

import { SingleColumnPage } from "src/components/layout/pages"
import { useTaxRegion } from "src/hooks/api/tax-regions"
import { TaxRegionDetailSection } from "src/routes/tax-regions/tax-region-detail/components/tax-region-detail-section"
import { TaxRegionProvinceSection } from "src/routes/tax-regions/tax-region-detail/components/tax-region-province-section"

import { SingleColumnPageSkeleton } from "src/components/common/skeleton"
import { useExtension } from "src/providers/extension-provider"
import { TaxRegionOverrideSection } from "src/routes/tax-regions/tax-region-detail/components/tax-region-override-section"
import { TaxRegionSublevelAlert } from "src/routes/tax-regions/tax-region-detail/components/tax-region-sublevel-alert"
import { TaxRegionProviderSection } from "src/routes/tax-regions/tax-region-detail/tax-region-provider-section"
import { taxRegionLoader } from "src/routes/tax-regions/tax-region-detail/loader"

export const TaxRegionDetail = () => {
  const { id } = useParams()
  const [showSublevelRegions, setShowSublevelRegions] = useState(false)

  const initialData = useLoaderData() as Awaited<
    ReturnType<typeof taxRegionLoader>
  >

  const {
    tax_region: taxRegion,
    isLoading,
    isError,
    error,
  } = useTaxRegion(id!, undefined, { initialData })

  const { getWidgets } = useExtension()

  if (isLoading || !taxRegion) {
    return <SingleColumnPageSkeleton sections={4} showJSON />
  }

  if (isError) {
    throw error
  }

  return (
    <SingleColumnPage
      data={taxRegion}
      showJSON
      // showMetadata // TOOD -> enable tax region metadata
      widgets={{
        after: getWidgets("tax.details.after"),
        before: getWidgets("tax.details.before"),
      }}
    >
      <TaxRegionSublevelAlert
        taxRegion={taxRegion}
        showSublevelRegions={showSublevelRegions}
        setShowSublevelRegions={setShowSublevelRegions}
      />
      <TaxRegionDetailSection taxRegion={taxRegion} />
      <TaxRegionProvinceSection
        taxRegion={taxRegion}
        showSublevelRegions={showSublevelRegions}
      />
      <TaxRegionOverrideSection taxRegion={taxRegion} />
      <TaxRegionProviderSection taxRegion={taxRegion} />
    </SingleColumnPage>
  )
}
