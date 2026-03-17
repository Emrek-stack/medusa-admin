import { Button, Container, Heading } from "@medusajs/ui"
import { keepPreviousData } from "@tanstack/react-query"
import { useTranslation } from "react-i18next"
import { Link, Outlet, useLocation } from "react-router-dom"

import { _DataTable } from "src/components/table/data-table/data-table"
import { useOrders } from "src/hooks/api/orders"
import { useOrderTableColumns } from "src/hooks/table/columns/use-order-table-columns"
import { useOrderTableQuery } from "src/hooks/table/query/use-order-table-query"
import { useDataTable } from "src/hooks/use-data-table"
import { useFeatureFlag } from "src/providers/feature-flag-provider"
import { ConfigurableOrderListTable } from "src/routes/orders/order-list/components/order-list-table/configurable-order-list-table"

import { DEFAULT_FIELDS } from "src/routes/orders/order-list/const"
import { useOrderTableFilters } from "src/hooks/table/filters"

const PAGE_SIZE = 20

export const OrderListTable = () => {
  const { t } = useTranslation()
  const location = useLocation()
  const isViewConfigEnabled = useFeatureFlag("view_configurations")

  // If feature flag is enabled, use the new configurable table
  if (isViewConfigEnabled) {
    return <ConfigurableOrderListTable />
  }

  const { searchParams, raw } = useOrderTableQuery({
    pageSize: PAGE_SIZE,
  })

  const { orders, count, isError, error, isLoading } = useOrders(
    {
      fields: DEFAULT_FIELDS,
      ...searchParams,
    },
    {
      placeholderData: keepPreviousData,
    }
  )

  const filters = useOrderTableFilters()
  const columns = useOrderTableColumns({})

  const { table } = useDataTable({
    data: orders ?? [],
    columns,
    enablePagination: true,
    count,
    pageSize: PAGE_SIZE,
  })

  if (isError) {
    throw error
  }

  return (
    <Container className="divide-y p-0">
      <div className="flex items-center justify-between px-6 py-4">
        <Heading>{t("orders.domain")}</Heading>
        <Button size="small" variant="secondary" asChild>
          <Link to={`export${location.search}`}>{t("actions.export")}</Link>
        </Button>
      </div>
      <_DataTable
        columns={columns}
        table={table}
        pagination
        navigateTo={(row) => `/orders/${row.original.id}`}
        filters={filters}
        count={count}
        search
        isLoading={isLoading}
        pageSize={PAGE_SIZE}
        orderBy={[
          { key: "display_id", label: t("orders.fields.displayId") },
          { key: "created_at", label: t("fields.createdAt") },
          { key: "updated_at", label: t("fields.updatedAt") },
        ]}
        queryObject={raw}
        noRecords={{
          message: t("orders.list.noRecordsMessage"),
        }}
      />
      <Outlet />
    </Container>
  )
}
