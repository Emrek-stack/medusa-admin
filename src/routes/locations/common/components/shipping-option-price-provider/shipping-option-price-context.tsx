import { createContext } from "react"
import { ConditionalPriceInfo } from "src/routes/locations/common/types"

type ShippingOptionPriceContextType = {
  onOpenConditionalPricesModal: (info: ConditionalPriceInfo) => void
  onCloseConditionalPricesModal: () => void
}

export const ShippingOptionPriceContext =
  createContext<ShippingOptionPriceContextType | null>(null)
