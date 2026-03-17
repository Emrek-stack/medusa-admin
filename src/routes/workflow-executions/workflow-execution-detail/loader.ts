import { LoaderFunctionArgs } from "react-router-dom"

import { workflowExecutionsQueryKeys } from "src/hooks/api/workflow-executions"
import { sdk } from "src/lib/client"
import { queryClient } from "src/lib/query-client"

const executionDetailQuery = (id: string) => ({
  queryKey: workflowExecutionsQueryKeys.detail(id),
  queryFn: async () => sdk.admin.workflowExecution.retrieve(id),
})

export const workflowExecutionLoader = async ({
  params,
}: LoaderFunctionArgs) => {
  const id = params.id
  const query = executionDetailQuery(id!)

  return queryClient.ensureQueryData(query)
}
