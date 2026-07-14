import { addressLookupSchema } from './address-lookup-schema.js'
import { addressesSchema } from './addresses-schema.js'
import { ukPostcodeSchema } from './uk-postcode-schema.js'

export const osPlacesSchemas = {
  addressLookup: addressLookupSchema,
  addresses: addressesSchema,
  ukPostcode: ukPostcodeSchema
}
