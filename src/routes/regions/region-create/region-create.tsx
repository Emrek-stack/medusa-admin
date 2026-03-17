import { RouteFocusModal } from "src/components/modals/route-focus-modal"
import { useStore } from "src/hooks/api/store"
import { currencies } from "src/lib/data/currencies"
import { CreateRegionForm } from "src/routes/regions/region-create/components/create-region-form"

export const RegionCreate = () => {
  const { store, isPending: isLoading, isError, error } = useStore()

  const storeCurrencies = (store?.supported_currencies ?? []).map(
    (c) => currencies[c.currency_code.toUpperCase()]
  )

  if (isError) {
    throw error
  }

  return (
    <RouteFocusModal>
      {!isLoading && store && <CreateRegionForm currencies={storeCurrencies} />}
    </RouteFocusModal>
  )
}
