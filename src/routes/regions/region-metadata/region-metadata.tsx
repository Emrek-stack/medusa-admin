import { useParams } from "react-router-dom"

import { MetadataForm } from "src/components/forms/metadata-form"
import { RouteDrawer } from "src/components/modals"
import { useRegion, useUpdateRegion } from "src/hooks/api"

export const RegionMetadata = () => {
  const { id } = useParams()

  const { region, isPending, isError, error } = useRegion(id!)
  const { mutateAsync, isPending: isMutating } = useUpdateRegion(id!)

  if (isError) {
    throw error
  }

  return (
    <RouteDrawer>
      <MetadataForm
        isPending={isPending}
        isMutating={isMutating}
        hook={mutateAsync}
        metadata={region?.metadata}
      />
    </RouteDrawer>
  )
}
