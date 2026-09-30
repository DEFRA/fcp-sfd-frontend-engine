import { buildManualAddress, buildUprnAddress } from '../services/build-address-variables-service.js'

/**
 * Builds the GraphQL variables for the `updateCustomerAddress` mutation.
 *
 * The DAL/v1 supports two address submission modes:
 *
 * 1. Postcode lookup address (with UPRN)
 *    If a `uprn` (Unique Property Reference Number) is present, it is the
 *    primary identifier for the address. Other address fields are still
 *    included but are not strictly validated by the DAL.
 *
 * 2. Manually entered address (without UPRN)
 *    If there is no `uprn`, the DAL/v1 requires `line1`, `city`, `postalCode` and `country`.
 *
 * @param {object} change - The address change object held in the session
 * @param {string} crn - The Customer Reference Number of the customer being updated
 * @returns {object} The mutation variables in the shape `{ input: { crn, address } }`
 */
export const buildUpdateCustomerAddressVariables = (change, crn) => {
  return {
    input: {
      crn,
      address: change.uprn ? buildUprnAddress(change) : buildManualAddress(change)
    }
  }
}
