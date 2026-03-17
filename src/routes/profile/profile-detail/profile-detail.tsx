import { useMe } from "src/hooks/api/users"
import { ProfileGeneralSection } from "src/routes/profile/profile-detail/components/profile-general-section"

import { SingleColumnPageSkeleton } from "src/components/common/skeleton"
import { SingleColumnPage } from "src/components/layout/pages"
import { useExtension } from "src/providers/extension-provider"

export const ProfileDetail = () => {
  const { user, isPending: isLoading, isError, error } = useMe()
  const { getWidgets } = useExtension()

  if (isLoading || !user) {
    return <SingleColumnPageSkeleton sections={1} />
  }

  if (isError) {
    throw error
  }

  return (
    <SingleColumnPage
      widgets={{
        after: getWidgets("profile.details.after"),
        before: getWidgets("profile.details.before"),
      }}
    >
      <ProfileGeneralSection user={user} />
    </SingleColumnPage>
  )
}
