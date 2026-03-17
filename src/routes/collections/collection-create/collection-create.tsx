import { RouteFocusModal } from "src/components/modals"
import { CreateCollectionForm } from "src/routes/collections/collection-create/components/create-collection-form"

export const CollectionCreate = () => {
  return (
    <RouteFocusModal>
      <CreateCollectionForm />
    </RouteFocusModal>
  )
}
