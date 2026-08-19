import { updateBusinessEmailMutation } from './business/update-business-email.js'
import { updateBusinessNameMutation } from './business/update-business-name.js'
import { updateBusinessPhoneNumbersMutation } from './business/update-business-phone-numbers.js'
import { updateCustomerNameMutation } from './personal/update-customer-name.js'
import { updateCustomerDobMutation } from './personal/update-customer-dob.js'
import { updateCustomerPhoneMutation } from './personal/update-customer-phone.js'
import { updateCustomerEmailMutation } from './personal/update-customer-email.js'
import { updateCustomerAddressMutation } from './personal/update-customer-address.js'
import { updateBusinessAddressMutation } from './business/update-business-address.js'
import { updateBusinessVatMutation } from './business/update-business-vat.js'
import { updateCustomerDetailsMutation } from './personal/update-customer-details.js'

export const mutations = {
  updateBusinessEmail: updateBusinessEmailMutation,
  updateBusinessName: updateBusinessNameMutation,
  updateBusinessPhoneNumbers: updateBusinessPhoneNumbersMutation,
  updateBusinessAddress: updateBusinessAddressMutation,
  updateCustomerName: updateCustomerNameMutation,
  updateCustomerDob: updateCustomerDobMutation,
  updateCustomerPhone: updateCustomerPhoneMutation,
  updateCustomerEmail: updateCustomerEmailMutation,
  updateCustomerAddress: updateCustomerAddressMutation,
  updateBusinessVat: updateBusinessVatMutation,
  updateCustomerDetails: updateCustomerDetailsMutation
}
