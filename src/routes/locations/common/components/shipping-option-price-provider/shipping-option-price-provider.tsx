import { ShippingOptionPriceContext } from "src/routes/locations/common/components/shipping-option-price-provider/shipping-option-price-context"

import { PropsWithChildren } from "react"
import { ConditionalPriceInfo } from "src/routes/locations/common/types"

type ShippingOptionPriceProviderProps = PropsWithChildren<{
  onOpenConditionalPricesModal: (info: ConditionalPriceInfo) => void
  onCloseConditionalPricesModal: () => void
}>

export const ShippingOptionPriceProvider = ({
  children,
  onOpenConditionalPricesModal,
  onCloseConditionalPricesModal,
}: ShippingOptionPriceProviderProps) => {
  return (
    <ShippingOptionPriceContext.Provider
      value={{ onOpenConditionalPricesModal, onCloseConditionalPricesModal }}
    >
      {children}
    </ShippingOptionPriceContext.Provider>
  )
}
