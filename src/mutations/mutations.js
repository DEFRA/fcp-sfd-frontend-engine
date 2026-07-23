import { updateBusinessEmailMutation } from './business/update-business-email.js'
import { updateCustomerNameMutation } from './personal/update-customer-name.js'

export const mutations = {
  updateBusinessEmail: updateBusinessEmailMutation,
  updateCustomerName: updateCustomerNameMutation
}
