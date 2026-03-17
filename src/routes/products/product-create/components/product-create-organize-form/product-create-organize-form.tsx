import { UseFormReturn } from "react-hook-form"

import { StackedFocusModal } from "src/components/modals"
import { FormExtensionZone } from "src/dashboard-app"
import { useExtension } from "src/providers/extension-provider"
import { ProductCreateSchemaType } from "src/routes/products/product-create/types"
import { ProductCreateOrganizationSection } from "src/routes/products/product-create/components/product-create-organize-form/components/product-create-organize-section"
import { ProductCreateSalesChannelStackedModal } from "src/routes/products/product-create/components/product-create-organize-form/components/product-create-sales-channel-stacked-modal"
import { SC_STACKED_MODAL_ID } from "src/routes/products/product-create/components/product-create-organize-form/constants"

type ProductAttributesProps = {
  form: UseFormReturn<ProductCreateSchemaType>
}

export const ProductCreateOrganizeForm = ({ form }: ProductAttributesProps) => {
  const { getFormFields } = useExtension()
  const fields = getFormFields("product", "create", "organize")

  return (
    <StackedFocusModal id={SC_STACKED_MODAL_ID}>
      <div className="flex flex-col items-center p-16">
        <div className="flex w-full max-w-[720px] flex-col gap-y-8">
          <ProductCreateOrganizationSection form={form} />
          <FormExtensionZone fields={fields} form={form} />
          {/* TODO: WHERE DO WE SET PRODUCT ATTRIBUTES? -> the plan is to moved that to Inventory UI */}
          {/* <Divider />*/}
          {/* <ProductCreateAttributeSection form={form} />*/}
        </div>
      </div>
      <ProductCreateSalesChannelStackedModal form={form} />
    </StackedFocusModal>
  )
}
