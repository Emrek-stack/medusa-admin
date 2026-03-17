import { RouteFocusModal } from "src/components/modals/route-focus-modal"
import { useStore } from "src/hooks/api"
import { useFeatureFlag } from "src/providers/feature-flag-provider"
import { useNavigate } from "react-router-dom"
import { AddLocalesForm } from "src/routes/store/store-add-locales/components/add-locales-form/add-locales-form"

export const TranslationsAddLocales = () => {
  const isEnabled = useFeatureFlag("translation")
  const navigate = useNavigate()

  if (!isEnabled) {
    navigate(-1)
    return null
  }

  const { store, isPending, isError, error } = useStore()

  const ready = !!store && !isPending

  if (isError) {
    throw error
  }

  return (
    <RouteFocusModal>
      {ready && <AddLocalesForm store={store} />}
    </RouteFocusModal>
  )
}
