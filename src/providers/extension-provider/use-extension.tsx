import { useContext } from "react"
import { ExtensionContext } from "src/providers/extension-provider/extension-context"

export const useExtension = () => {
  const context = useContext(ExtensionContext)
  if (!context) {
    throw new Error("useExtension must be used within a ExtensionProvider")
  }
  return context
}
