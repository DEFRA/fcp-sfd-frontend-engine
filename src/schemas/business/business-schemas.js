import { businessSbiSchema } from './business-sbi-schema.js'
import { addressSchema } from '../shared/address-schema.js'
import { businessNameSchema } from './business-name-schema.js'
import { businessEmailSchema } from './business-email-schema.js'
import { businessPhoneSchema } from './business-phone-schema.js'
import { businessVatSchema } from './business-vat-schema.js'

/**
 * The businessSchema object has a nested property of `details`.
 * This is due to the interrupter journey. The journey required the business details to be validated in a single step,
 * these include name, address, phone, email and vat. The `details` property is used to group these schemas together.
 * The `sbi` property is separate as it is validated in a different step of the journey.
 */
export const businessSchemas = {
  sbi: businessSbiSchema,
  details: {
    name: businessNameSchema,
    address: addressSchema,
    phone: businessPhoneSchema,
    email: businessEmailSchema,
    vat: businessVatSchema
  }
}
