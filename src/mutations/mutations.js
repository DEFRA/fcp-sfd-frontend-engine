import { updateBusinessEmailMutation } from './business/update-business-email.js'
import { updateBusinessNameMutation } from './business/update-business-name.js'
import { updateCustomerNameMutation } from './personal/update-customer-name.js'
import { updateCustomerDobMutation } from './personal/update-customer-dob.js'
import { updateCustomerPhoneMutation } from './personal/update-customer-phone.js'
import { updateCustomerEmailMutation } from './personal/update-customer-email.js'
import { updateCustomerAddressMutation } from './personal/update-customer-address.js'
import { updateBusinessAddressMutation } from './business/update-business-address.js'

export const mutations = {
  updateBusinessEmail: updateBusinessEmailMutation,
  updateBusinessName: updateBusinessNameMutation,
  updateCustomerName: updateCustomerNameMutation,
  updateCustomerDob: updateCustomerDobMutation,
  updateCustomerPhone: updateCustomerPhoneMutation,
  updateCustomerEmail: updateCustomerEmailMutation,
  updateCustomerAddress: updateCustomerAddressMutation,
  updateBusinessAddress: updateBusinessAddressMutation,
}
