import { useParams } from "react-router-dom"

import { useInventoryItem, useUpdateInventoryItem } from "src/hooks/api"
import { MetadataForm } from "src/components/forms/metadata-form"
import { RouteDrawer } from "src/components/modals"

export const InventoryItemMetadata = () => {
  const { id } = useParams()

  const { inventory_item, isPending, isError, error } = useInventoryItem(id)
  const { mutateAsync, isPending: isMutating } = useUpdateInventoryItem(id)

  if (isError) {
    throw error
  }

  return (
    <RouteDrawer>
      <MetadataForm
        isPending={isPending}
        isMutating={isMutating}
        hook={mutateAsync}
        metadata={inventory_item?.metadata}
      />
    </RouteDrawer>
  )
}
