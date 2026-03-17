import { useParams } from "react-router-dom"

import { MetadataForm } from "src/components/forms/metadata-form"
import { RouteDrawer } from "src/components/modals"
import { useUpdateUser, useUser } from "src/hooks/api"

export const UserMetadata = () => {
  const { id } = useParams()

  const { user, isPending, isError, error } = useUser(id!)
  const { mutateAsync, isPending: isMutating } = useUpdateUser(id!)

  if (isError) {
    throw error
  }

  return (
    <RouteDrawer>
      <MetadataForm
        isPending={isPending}
        isMutating={isMutating}
        hook={mutateAsync}
        metadata={user?.metadata}
      />
    </RouteDrawer>
  )
}
