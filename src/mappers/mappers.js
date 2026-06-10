import { mapPersonalBusinessDetails } from './personal-business-details-mapper.js'
import { mapAddress } from './address-mapper.js'
import { mapCustomerName } from './customer-name-mapper.js'

export const mappers = {
  personalBusinessDetails: mapPersonalBusinessDetails,
  address: mapAddress,
  customerName: mapCustomerName
}
