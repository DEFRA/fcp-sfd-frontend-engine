import { updateCustomerNameMutation } from './personal/update-customer-name.js'
import { updateCustomerEmailMutation } from './personal/update-customer-email.js'

export const mutations = {
  updateCustomerName: updateCustomerNameMutation,
  updateCustomerEmail: updateCustomerEmailMutation
}
