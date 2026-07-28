import { updateBusinessEmailMutation } from './business/update-business-email.js'
import { updateBusinessNameMutation } from './business/update-business-name.js'
import { updateCustomerNameMutation } from './personal/update-customer-name.js'
import { updateCustomerEmailMutation } from './personal/update-customer-email.js'
import { updateCustomerPhoneMutation } from './personal/update-customer-phone.js'

export const mutations = {
  updateBusinessEmail: updateBusinessEmailMutation,
  updateBusinessName: updateBusinessNameMutation,
  updateCustomerName: updateCustomerNameMutation,
  updateCustomerEmail: updateCustomerEmailMutation,
  updateCustomerPhone: updateCustomerPhoneMutation
}
