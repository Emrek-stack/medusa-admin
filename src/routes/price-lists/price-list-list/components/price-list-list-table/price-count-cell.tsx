import { usePriceListPrices } from "src/hooks/api/price-lists"
import { PlaceholderCell } from "src/components/table/table-cells/common/placeholder-cell"
import { TextCell } from "src/components/table/table-cells/common/text-cell"

type PriceCountCellProps = {
  priceListId: string
}

export const PriceCountCell = ({ priceListId }: PriceCountCellProps) => {
  const { count, isLoading } = usePriceListPrices(priceListId, {
    limit: 1,
  })

  if (isLoading) {
    return <PlaceholderCell />
  }

  return <TextCell text={count && count > 0 ? count.toString() : "-"} />
}
