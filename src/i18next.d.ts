import { Resources } from "src/i18n/types"

declare module "i18next" {
  interface CustomTypeOptions {
    resources: Resources
  }
}
