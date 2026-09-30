import { buildManualAddress, buildUprnAddress } from '../services/build-address-variables-service.js'

/**
 * Builds the GraphQL variables for the `updateBusinessAddress` mutation.
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
 * Unlike customer addresses, business addresses are wrapped in either `withUprn` or `withoutUprn`.
 *
 * @param {object} change - The address change object held in the session
 * @param {string} sbi - The Single Business Identifier of the business being updated
 * @returns {object} The mutation variables in the shape `{ input: { sbi, address: { withUprn | withoutUprn } } }`
 */
export const buildUpdateBusinessAddressVariables = (change, sbi) => {
  const address = change.uprn
    ? { withUprn: buildUprnAddress(change) }
    : { withoutUprn: buildManualAddress(change) }

  return {
    input: {
      sbi,
      address
    }
  }
}
