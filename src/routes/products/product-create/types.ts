import { z } from "zod"
import { EditProductMediaSchema, ProductCreateSchema } from "src/routes/products/product-create/constants"

export type ProductCreateSchemaType = z.infer<typeof ProductCreateSchema>

export type EditProductMediaSchemaType = z.infer<typeof EditProductMediaSchema>
