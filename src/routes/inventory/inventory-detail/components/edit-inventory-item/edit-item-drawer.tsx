import { Heading } from "@medusajs/ui"
import { useTranslation } from "react-i18next"
import { useParams } from "react-router-dom"
import { RouteDrawer } from "src/components/modals"
import { useInventoryItem } from "src/hooks/api/inventory"
import { EditInventoryItemForm } from "src/routes/inventory/inventory-detail/components/edit-inventory-item/components/edit-item-form"

export const InventoryItemEdit = () => {
  const { id } = useParams()
  const { t } = useTranslation()

  const {
    inventory_item: inventoryItem,
    isPending: isLoading,
    isError,
    error,
  } = useInventoryItem(id!)

  const ready = !isLoading && inventoryItem

  if (isError) {
    throw error
  }

  return (
    <RouteDrawer>
      <RouteDrawer.Header>
        <Heading>{t("inventory.editItemDetails")}</Heading>
      </RouteDrawer.Header>
      {ready && <EditInventoryItemForm item={inventoryItem} />}
    </RouteDrawer>
  )
}
