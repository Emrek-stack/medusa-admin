import { createColumnHelper } from "@tanstack/react-table"
import { useMemo } from "react"

import {
  CollectionCell,
  CollectionHeader,
} from "src/components/table/table-cells/product/collection-cell/collection-cell"
import {
  ProductCell,
  ProductHeader,
} from "src/components/table/table-cells/product/product-cell"
import {
  ProductStatusCell,
  ProductStatusHeader,
} from "src/components/table/table-cells/product/product-status-cell"
import {
  SalesChannelHeader,
  SalesChannelsCell,
} from "src/components/table/table-cells/product/sales-channels-cell"
import {
  VariantCell,
  VariantHeader,
} from "src/components/table/table-cells/product/variant-cell"
import { HttpTypes } from "@medusajs/types"

const columnHelper = createColumnHelper<HttpTypes.AdminProduct>()

export const useProductTableColumns = () => {
  return useMemo(
    () => [
      columnHelper.display({
        id: "product",
        header: () => <ProductHeader />,
        cell: ({ row }) => <ProductCell product={row.original} />,
      }),
      columnHelper.accessor("collection", {
        header: () => <CollectionHeader />,
        cell: ({ row }) => (
          <CollectionCell collection={row.original.collection} />
        ),
      }),
      columnHelper.accessor("sales_channels", {
        header: () => <SalesChannelHeader />,
        cell: ({ row }) => (
          <SalesChannelsCell salesChannels={row.original.sales_channels} />
        ),
      }),
      columnHelper.accessor("variants", {
        header: () => <VariantHeader />,
        cell: ({ row }) => <VariantCell variants={row.original.variants} />,
      }),
      columnHelper.accessor("status", {
        header: () => <ProductStatusHeader />,
        cell: ({ row }) => <ProductStatusCell status={row.original.status} />,
      }),
    ],
    []
  )
}
