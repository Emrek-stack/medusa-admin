import { useLoaderData, useParams } from "react-router-dom"

import { SingleColumnPageSkeleton } from "src/components/common/skeleton"
import { SingleColumnPage } from "src/components/layout/pages"
import { useApiKey } from "src/hooks/api/api-keys"
import { useExtension } from "src/providers/extension-provider"
import { ApiKeyType } from "src/routes/api-key-management/common/constants"
import { ApiKeyGeneralSection } from "src/routes/api-key-management/api-key-management-detail/components/api-key-general-section"
import { ApiKeySalesChannelSection } from "src/routes/api-key-management/api-key-management-detail/components/api-key-sales-channel-section"
import { apiKeyLoader } from "src/routes/api-key-management/api-key-management-detail/loader"

export const ApiKeyManagementDetail = () => {
  const initialData = useLoaderData() as Awaited<
    ReturnType<typeof apiKeyLoader>
  >

  const { id } = useParams()
  const { getWidgets } = useExtension()

  const { api_key, isLoading, isError, error } = useApiKey(id!, {
    initialData: initialData,
  })

  if (isLoading || !api_key) {
    return <SingleColumnPageSkeleton showJSON sections={1} />
  }

  const isPublishable = api_key?.type === ApiKeyType.PUBLISHABLE

  if (isError) {
    throw error
  }

  return (
    <SingleColumnPage
      hasOutlet
      showJSON
      widgets={{
        before: getWidgets("api_key.details.before"),
        after: getWidgets("api_key.details.after"),
      }}
      data={api_key}
    >
      <ApiKeyGeneralSection apiKey={api_key} />
      {isPublishable && <ApiKeySalesChannelSection apiKey={api_key} />}
    </SingleColumnPage>
  )
}
