import { updateBusinessEmailMutation } from './business/update-business-email.js'
import { updateCustomerNameMutation } from './personal/update-customer-name.js'
import { updateCustomerEmailMutation } from './personal/update-customer-email.js'

export const mutations = {
  updateBusinessEmail: updateBusinessEmailMutation,
  updateCustomerName: updateCustomerNameMutation,
  updateCustomerEmail: updateCustomerEmailMutation
}
