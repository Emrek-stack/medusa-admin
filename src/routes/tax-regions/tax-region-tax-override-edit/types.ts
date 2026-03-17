import { TaxRateRuleReferenceType } from "src/routes/tax-regions/common/constants"
import { TaxRateRuleReference } from "src/routes/tax-regions/common/schemas"

export type InitialRuleValues = {
  [TaxRateRuleReferenceType.PRODUCT]: TaxRateRuleReference[]
  // [TaxRateRuleReferenceType.PRODUCT_COLLECTION]: TaxRateRuleReference[]
  // [TaxRateRuleReferenceType.PRODUCT_TAG]: TaxRateRuleReference[]
  [TaxRateRuleReferenceType.SHIPPING_OPTION]: TaxRateRuleReference[]
  [TaxRateRuleReferenceType.PRODUCT_TYPE]: TaxRateRuleReference[]
  // [TaxRateRuleReferenceType.CUSTOMER_GROUP]: TaxRateRuleReference[]
}
