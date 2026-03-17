import { useContext } from "react"
import { ThemeContext } from "src/providers/theme-provider/theme-context"

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
