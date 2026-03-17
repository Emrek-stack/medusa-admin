import { HttpTypes } from "@medusajs/types"
import { getPromotionStatus } from "src/lib/promotions"
import { StatusCell as StatusCell_ } from "src/components/table/table-cells/common/status-cell"

type PromotionCellProps = {
  promotion: HttpTypes.AdminPromotion
}

export const StatusCell = ({ promotion }: PromotionCellProps) => {
  const [color, text] = getPromotionStatus(promotion)

  return <StatusCell_ color={color}>{text}</StatusCell_>
}
