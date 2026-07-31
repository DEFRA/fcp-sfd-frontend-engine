import { addressLookupService } from './os-places/address-lookup-service.js'
import { buildUprnAddress, buildManualAddress } from './build-address-variables-service.js'

export const services = {
  addressLookup: addressLookupService,
  buildUprnAddress,
  buildManualAddress
}
