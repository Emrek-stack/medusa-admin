import { useParams } from "react-router-dom"
import { MetadataForm } from "src/components/forms/metadata-form/metadata-form"
import { useProductVariant, useUpdateProductVariant } from "src/hooks/api"

export const ProductVariantMetadata = () => {
  const { id, variant_id } = useParams()

  const { variant, isPending, isError, error } = useProductVariant(
    id!,
    variant_id!
  )

  const { mutateAsync, isPending: isMutating } = useUpdateProductVariant(
    id!,
    variant_id!
  )

  if (isError) {
    throw error
  }

  return (
    <MetadataForm
      metadata={variant?.metadata}
      hook={mutateAsync}
      isPending={isPending}
      isMutating={isMutating}
    />
  )
}
