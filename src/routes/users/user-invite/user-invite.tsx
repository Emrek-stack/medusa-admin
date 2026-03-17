import { RouteFocusModal } from "src/components/modals"
import { InviteUserForm } from "src/routes/users/user-invite/components/invite-user-form/invite-user-form"

export const UserInvite = () => {
  return (
    <RouteFocusModal>
      <InviteUserForm />
    </RouteFocusModal>
  )
}
