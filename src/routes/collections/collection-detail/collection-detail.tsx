import { useLoaderData, useParams } from "react-router-dom"

import { SingleColumnPageSkeleton } from "src/components/common/skeleton"
import { SingleColumnPage } from "src/components/layout/pages"
import { useCollection } from "src/hooks/api/collections"
import { useExtension } from "src/providers/extension-provider"
import { CollectionGeneralSection } from "src/routes/collections/collection-detail/components/collection-general-section"
import { CollectionProductSection } from "src/routes/collections/collection-detail/components/collection-product-section"
import { collectionLoader } from "src/routes/collections/collection-detail/loader"

export const CollectionDetail = () => {
  const initialData = useLoaderData() as Awaited<
    ReturnType<typeof collectionLoader>
  >

  const { id } = useParams()
  const { collection, isLoading, isError, error } = useCollection(id!, {
    initialData,
  })

  const { getWidgets } = useExtension()

  if (isLoading || !collection) {
    return <SingleColumnPageSkeleton sections={2} showJSON showMetadata />
  }

  if (isError) {
    throw error
  }

  return (
    <SingleColumnPage
      widgets={{
        after: getWidgets("product_collection.details.after"),
        before: getWidgets("product_collection.details.before"),
      }}
      showJSON
      showMetadata
      data={collection}
    >
      <CollectionGeneralSection collection={collection} />
      <CollectionProductSection collection={collection} />
    </SingleColumnPage>
  )
}
