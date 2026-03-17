import { PropsWithChildren, useEffect, useState } from "react"
import { Search } from "src/components/search"
import { useSidebar } from "src/providers/sidebar-provider"
import { SearchContext } from "src/providers/search-provider/search-context"

export const SearchProvider = ({ children }: PropsWithChildren) => {
  const [open, setOpen] = useState(false)
  const { mobile, toggle } = useSidebar()

  const toggleSearch = () => {
    const update = !open

    /**
     * If the mobile sidebar is open, then make sure
     * to close it when opening the search
     */
    if (update && mobile) {
      toggle("mobile")
    }

    setOpen(update)
  }

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        setOpen((prev) => !prev)
      }
    }

    document.addEventListener("keydown", onKeyDown)

    return () => {
      document.removeEventListener("keydown", onKeyDown)
    }
  }, [])

  return (
    <SearchContext.Provider
      value={{
        open,
        onOpenChange: setOpen,
        toggleSearch,
      }}
    >
      {children}
      <Search />
    </SearchContext.Provider>
  )
}
