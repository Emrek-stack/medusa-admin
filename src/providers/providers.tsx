import { Toaster, TooltipProvider } from "@medusajs/ui"
import { QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { type PropsWithChildren, useEffect, useState } from "react"
import { HelmetProvider } from "react-helmet-async"
import { I18n } from "src/components/utilities/i18n"
import { DashboardApp } from "src/dashboard-app"
import { queryClient } from "src/lib/query-client"
import { ExtensionProvider } from "src/providers/extension-provider"
import { I18nProvider } from "src/providers/i18n-provider"
import { ThemeProvider } from "src/providers/theme-provider"
import { FeatureFlagProvider } from "src/providers/feature-flag-provider"
type ProvidersProps = PropsWithChildren<{
  api: DashboardApp["api"]
}>

export const Providers = ({ api, children }: ProvidersProps) => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <TooltipProvider>
      <ExtensionProvider api={api}>
        <HelmetProvider>
          <QueryClientProvider client={queryClient}>
            {import.meta.env.DEV && isMounted ? (
              <ReactQueryDevtools
                initialIsOpen={false}
                buttonPosition="bottom-right"
              />
            ) : null}
            <ThemeProvider>
              <FeatureFlagProvider>
                <I18n />
                <I18nProvider>{children}</I18nProvider>
                <Toaster />
              </FeatureFlagProvider>
            </ThemeProvider>
          </QueryClientProvider>
        </HelmetProvider>
      </ExtensionProvider>
    </TooltipProvider>
  )
}
