import { useLoaderData } from "react-router-dom"

import { useStore } from "src/hooks/api/store"
import { StoreGeneralSection } from "src/routes/store/store-detail/components/store-general-section"
import { storeLoader } from "src/routes/store/store-detail/loader"

import { SingleColumnPageSkeleton } from "src/components/common/skeleton"
import { SingleColumnPage } from "src/components/layout/pages"
import { useExtension } from "src/providers/extension-provider"
import { StoreCurrencySection } from "src/routes/store/store-detail/components/store-currency-section"
import { StoreLocaleSection } from "src/routes/store/store-detail/components/store-locale-section"
import { useFeatureFlag } from "src/providers/feature-flag-provider"

export const StoreDetail = () => {
  const initialData = useLoaderData() as Awaited<ReturnType<typeof storeLoader>>
  const isTranslationsEnabled = useFeatureFlag("translation")

  const { store, isPending, isError, error } = useStore(undefined, {
    initialData,
  })

  const { getWidgets } = useExtension()

  if (isPending || !store) {
    return <SingleColumnPageSkeleton sections={2} showJSON showMetadata />
  }

  if (isError) {
    throw error
  }

  return (
    <SingleColumnPage
      widgets={{
        before: getWidgets("store.details.before"),
        after: getWidgets("store.details.after"),
      }}
      data={store}
      hasOutlet
      showMetadata
      showJSON
    >
      <StoreGeneralSection store={store} />
      <StoreCurrencySection store={store} />
      {isTranslationsEnabled && <StoreLocaleSection store={store} />}
    </SingleColumnPage>
  )
}
