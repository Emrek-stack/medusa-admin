import { WorkflowExecutionListTable } from "src/routes/workflow-executions/workflow-execution-list/components/workflow-execution-list-table"

import { SingleColumnPage } from "src/components/layout/pages"
import { useExtension } from "src/providers/extension-provider"

export const WorkflowExcecutionList = () => {
  const { getWidgets } = useExtension()

  return (
    <SingleColumnPage
      widgets={{
        after: getWidgets("workflow.list.after"),
        before: getWidgets("workflow.list.before"),
      }}
      hasOutlet={false}
    >
      <WorkflowExecutionListTable />
    </SingleColumnPage>
  )
}
