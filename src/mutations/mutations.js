import { updateBusinessAddressMutation } from './business/update-business-address.js'
import { updateBusinessDetailsMutation } from './business/update-business-details.js'
import { updateBusinessEmailMutation } from './business/update-business-email.js'
import { updateBusinessLegalStatusMutation } from './business/update-business-legal-status.js'
import { updateBusinessNameMutation } from './business/update-business-name.js'
import { updateBusinessPhoneNumbersMutation } from './business/update-business-phone-numbers.js'
import { updateBusinessRegistrationNumbersMutation } from './business/update-business-registration-numbers.js'
import { updateBusinessVatMutation } from './business/update-business-vat.js'
import { updateCustomerAddressMutation } from './personal/update-customer-address.js'
import { updateCustomerDetailsMutation } from './personal/update-customer-details.js'
import { updateCustomerDobMutation } from './personal/update-customer-dob.js'
import { updateCustomerEmailMutation } from './personal/update-customer-email.js'
import { updateCustomerNameMutation } from './personal/update-customer-name.js'
import { updateCustomerPhoneMutation } from './personal/update-customer-phone.js'

export const mutations = {
  updateBusinessAddress: updateBusinessAddressMutation,
  updateBusinessDetails: updateBusinessDetailsMutation,
  updateBusinessEmail: updateBusinessEmailMutation,
  updateBusinessLegalStatus: updateBusinessLegalStatusMutation,
  updateBusinessName: updateBusinessNameMutation,
  updateBusinessPhoneNumbers: updateBusinessPhoneNumbersMutation,
  updateBusinessRegistrationNumbers: updateBusinessRegistrationNumbersMutation,
  updateBusinessVat: updateBusinessVatMutation,
  updateCustomerAddress: updateCustomerAddressMutation,
  updateCustomerDetails: updateCustomerDetailsMutation,
  updateCustomerDob: updateCustomerDobMutation,
  updateCustomerEmail: updateCustomerEmailMutation,
  updateCustomerName: updateCustomerNameMutation,
  updateCustomerPhone: updateCustomerPhoneMutation
}
