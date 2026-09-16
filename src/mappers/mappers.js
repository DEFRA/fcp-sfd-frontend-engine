import { addressLookupMapper } from './address-lookup-mapper.js'
import { mapAddress } from './address-mapper.js'
import { mapBusinessDetails } from './business-details-mapper.js'
import { mapCustomerName } from './customer-name-mapper.js'
import { mapPersonalBusinessDetails } from './personal-business-details-mapper.js'
import { mapPersonalDetails } from './personal-details-mapper.js'

export const mappers = {
  address: mapAddress,
  addressLookup: addressLookupMapper,
  businessDetails: mapBusinessDetails,
  customerName: mapCustomerName,
  personalBusinessDetails: mapPersonalBusinessDetails,
  personalDetails: mapPersonalDetails
}
