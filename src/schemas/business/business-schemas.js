import { businessSbiSchema } from './business-sbi-schema.js'
import { addressSchema } from '../shared/address-schema.js'
import { businessNameSchema } from './business-name-schema.js'
import { businessEmailSchema } from './business-email-schema.js'
import { businessPhoneSchema } from './business-phone-schema.js'
import { businessVatSchema } from './business-vat-schema.js'
import { businessVatChangeSchema } from './business-vat-change-schema.js'
import { businessVatRemoveSchema } from './business-vat-remove-schema.js'

/**
 * The businessSchema object has a nested property of `details`.
 * This is due to the interrupter journey. The journey required the business details to be validated in a single step,
 * these include name, address, phone, email and vat. The `details` property is used to group these schemas together.
 * The `sbi` property is separate as it is validated in a different step of the journey.
 *
 * The `vat` property groups the schemas for the standalone VAT action pages:
 * - `vat.change` validates the dedicated VAT change page where a VAT registration number is mandatory
 *   (9 digits, `.required()`), so it is deliberately separate from `details.vat`.
 * - `vat.remove` validates the VAT removal confirmation page (yes/no).
 *
 * Note `details.vat` and `vat.change` are two distinct validation contexts for the same field: within the
 * interrupter `details` set VAT is optional and an empty string is allowed, whereas on the dedicated change
 * page a valid VAT number must be entered (removal is handled by its own journey).
 */
export const businessSchemas = {
  sbi: businessSbiSchema,
  details: {
    name: businessNameSchema,
    address: addressSchema,
    phone: businessPhoneSchema,
    email: businessEmailSchema,
    vat: businessVatSchema
  },
  vat: {
    change: businessVatChangeSchema,
    remove: businessVatRemoveSchema
  }
}
