import { RouteFocusModal } from "src/components/modals"
import { OrganizeCategoryForm } from "src/routes/categories/category-organize/components/organize-category-form/organize-category-form"

export const CategoryOrganize = () => {
  return (
    <RouteFocusModal>
      <OrganizeCategoryForm />
    </RouteFocusModal>
  )
}
