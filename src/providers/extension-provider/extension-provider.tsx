import { PropsWithChildren } from "react"
import { DashboardApp } from "src/dashboard-app/dashboard-app"
import { ExtensionContext } from "src/providers/extension-provider/extension-context"

type ExtensionProviderProps = PropsWithChildren<{
  api: DashboardApp["api"]
}>

export const ExtensionProvider = ({
  api,
  children,
}: ExtensionProviderProps) => {
  return (
    <ExtensionContext.Provider value={api}>
      {children}
    </ExtensionContext.Provider>
  )
}
