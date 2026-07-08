import { businessSbiSchema } from './business-sbi-schema.js'
import { addressSchema } from '../shared/address-schema.js'
import { businessNameSchema } from './business-name-schema.js'
import { businessEmailSchema } from './business-email-schema.js'
import { businessPhoneSchema } from './business-phone-schema.js'
import { businessVatSchema } from './business-vat-schema.js'

export const businessSchemas = {
  sbi: businessSbiSchema,
  address: addressSchema,
  details: {
    name: businessNameSchema,
    address: addressSchema,
    phone: businessPhoneSchema,
    email: businessEmailSchema,
    vat: businessVatSchema
  }
}
