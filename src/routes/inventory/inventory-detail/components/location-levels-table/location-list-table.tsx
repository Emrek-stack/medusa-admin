import { DataTable } from "src/components/data-table"
import { useInventoryItemLevels } from "src/hooks/api/inventory"
import { useLocationListTableColumns } from "src/routes/inventory/inventory-detail/components/location-levels-table/use-location-list-table-columns"
import { useLocationLevelTableQuery } from "src/routes/inventory/inventory-detail/components/location-levels-table/use-location-list-table-query"

const PAGE_SIZE = 20
const PREFIX = "invlvl"

export const ItemLocationListTable = ({
  inventory_item_id,
}: {
  inventory_item_id: string
}) => {
  const searchParams = useLocationLevelTableQuery({
    pageSize: PAGE_SIZE,
    prefix: PREFIX,
  })

  const {
    inventory_levels,
    count,
    isPending: isLoading,
    isError,
    error,
  } = useInventoryItemLevels(inventory_item_id, {
    ...searchParams,
    fields: "+stock_locations.id,+stock_locations.name",
  })

  const columns = useLocationListTableColumns()

  if (isError) {
    throw error
  }

  return (
    <DataTable
      data={inventory_levels ?? []}
      columns={columns}
      rowCount={count}
      pageSize={PAGE_SIZE}
      getRowId={(row) => row.id}
      isLoading={isLoading}
      prefix={PREFIX}
      layout="fill"
      enableSearch={false}
    />
  )
}
