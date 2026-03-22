import { type SchemaTypeDefinition } from 'sanity'
import { addressType } from './addressType'
import { authorType } from './authorType'
import { blockContentType } from './blockContentType'
import { blogCategoryType } from './blogCategoryType'
import { blogType } from './blogType'
import { brandType } from './brandTypes'
import { categoryType } from './categoryType'
import { orderType } from './orderType'
import { productType } from './productType'
import { reviewType } from "./reviewType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    productType,
    categoryType,
    reviewType,
    blogCategoryType,
    authorType,
    blockContentType,
    blogType,
    brandType,
    orderType,
    addressType,
  ],
}
