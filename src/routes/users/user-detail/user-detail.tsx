import { useLoaderData, useParams } from "react-router-dom"

import { useUser } from "src/hooks/api/users"
import { UserGeneralSection } from "src/routes/users/user-detail/components/user-general-section"
import { userLoader } from "src/routes/users/user-detail/loader"

import { SingleColumnPageSkeleton } from "src/components/common/skeleton"
import { SingleColumnPage } from "src/components/layout/pages"
import { useExtension } from "src/providers/extension-provider"

export const UserDetail = () => {
  const initialData = useLoaderData() as Awaited<ReturnType<typeof userLoader>>

  const { id } = useParams()
  const {
    user,
    isPending: isLoading,
    isError,
    error,
  } = useUser(id!, undefined, {
    initialData,
  })

  const { getWidgets } = useExtension()

  if (isLoading || !user) {
    return <SingleColumnPageSkeleton sections={1} showJSON showMetadata />
  }

  if (isError) {
    throw error
  }

  return (
    <SingleColumnPage
      data={user}
      showJSON
      showMetadata
      widgets={{
        after: getWidgets("user.details.after"),
        before: getWidgets("user.details.before"),
      }}
    >
      <UserGeneralSection user={user} />
    </SingleColumnPage>
  )
}
