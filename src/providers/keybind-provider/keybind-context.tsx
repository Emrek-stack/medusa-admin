import { createContext } from "react"
import { KeybindContextState } from "src/providers/keybind-provider/types"

export const KeybindContext = createContext<KeybindContextState | null>(null)
