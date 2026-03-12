import { DashboardApp } from "./dashboard-app"
import { DashboardPlugin } from "./dashboard-app/types"

import {
  displayModule,
  formModule,
  i18nModule,
  menuItemModule,
  routeModule,
  widgetModule,
} from "./extensions/local-modules"

import "./index.css"

const localPlugin = {
  widgetModule,
  routeModule,
  displayModule,
  formModule,
  menuItemModule,
  i18nModule,
}

interface AppProps {
  plugins?: DashboardPlugin[]
}

function App({ plugins = [] }: AppProps) {
  const app = new DashboardApp({
    plugins: [localPlugin, ...plugins],
  })

  return <div>{app.render()}</div>
}

export default App
