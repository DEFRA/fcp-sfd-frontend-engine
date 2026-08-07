import { mapPersonalBusinessDetails } from './personal-business-details-mapper.js'
import { mapAddress } from './address-mapper.js'
import { mapCustomerName } from './customer-name-mapper.js'
import { mapBusinessDetails } from './business-details-mapper.js'
import { addressLookupMapper } from './address-lookup-mapper.js'

export const mappers = {
  personalBusinessDetails: mapPersonalBusinessDetails,
  address: mapAddress,
  customerName: mapCustomerName,
  businessDetails: mapBusinessDetails,
  addressLookup: addressLookupMapper
}
