import { SingleColumnPage } from "src/components/layout/pages"
import { useExtension } from "src/providers/extension-provider"
import { UserListTable } from "src/routes/users/user-list/components/user-list-table"

export const UserList = () => {
  const { getWidgets } = useExtension()

  return (
    <SingleColumnPage
      widgets={{
        after: getWidgets("user.list.after"),
        before: getWidgets("user.list.before"),
      }}
    >
      <UserListTable />
    </SingleColumnPage>
  )
}
