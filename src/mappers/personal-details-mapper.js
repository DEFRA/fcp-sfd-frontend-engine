/**
 * Takes the raw personal details data from the DAL and maps it to a more usable format
 *
 * @param {Object} value - The data from the DAL
 * @returns {Object} Formatted personal details data
 * @throws {Error} If value is null, undefined, or missing required customer structure
 */

import { mapAddress } from './address-mapper.js'
import { mapCustomerName } from './customer-name-mapper.js'

const mapPersonalDetails = (value) => {
  // Validate input before processing
  protectAgainstNull(value)

  const customerInfo = value.customer.info
  const customerName = customerInfo.name

  // Safely split date of birth
  const [year, month, day] = customerInfo.dateOfBirth ? customerInfo.dateOfBirth.split('-') : []

  return {
    crn: value.customer.crn ?? null,
    userName: customerName ? mapCustomerName(customerName) : null,
    fullName: {
      first: customerName?.first ?? null,
      last: customerName?.last ?? null,
      middle: customerName?.middle ?? null
    },
    fullNameJoined: [
      customerName?.first,
      customerName?.middle,
      customerName?.last
    ].filter(Boolean).join(' '),
    dateOfBirth: {
      full: customerInfo.dateOfBirth ?? null,
      day: day ?? null,
      month: month ?? null,
      year: year ?? null
    },
    address: customerInfo.address ? mapAddress(customerInfo.address) : {},
    email: customerInfo.email?.address ?? null,
    telephone: customerInfo.phone?.landline ?? null,
    mobile: customerInfo.phone?.mobile ?? null
  }
}

/**
 * Validates that the input value has the required structure before mapping
 *
 * @param {Object} value - The data from the DAL
 * @throws {Error} If value is null, undefined, or missing required customer structure
 */
const protectAgainstNull = (value) => {
  if (!value) {
    throw new Error('Personal details value cannot be null or undefined')
  }

  if (!value.customer) {
    throw new Error('Personal details value must contain a customer object')
  }

  if (!value.customer.info) {
    throw new Error('Customer must contain an info object')
  }
}

export {
  mapPersonalDetails
}
