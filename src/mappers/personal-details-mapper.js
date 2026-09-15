/**
 * Takes the raw personal details data from the DAL and maps it to a more usable format
 *
 * @param {Object} value - The data from the DAL
 * @returns {Object} Formatted personal details data
 * @throws {Error} If value is null, undefined, or missing required customer structure
 */

import { mapAddress } from './address-mapper.js'
import { mapCustomerName } from './customer-name-mapper.js'
import { utils } from '../utils/utils.js'

const asNullable = (value) => {
  return value ?? null
}

export const mapPersonalDetails = (value) => {
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
      first: asNullable(customerName?.first),
      last: asNullable(customerName?.last),
      middle: asNullable(customerName?.middle)
    },
    fullNameJoined: customerName ? utils.formatFullName(customerName) : '',
    dateOfBirth: {
      full: asNullable(customerInfo.dateOfBirth),
      day: asNullable(day),
      month: asNullable(month),
      year: asNullable(year)
    },
    address: customerInfo.address ? mapAddress(customerInfo.address) : {},
    email: asNullable(customerInfo.email?.address),
    telephone: asNullable(customerInfo.phone?.landline),
    mobile: asNullable(customerInfo.phone?.mobile)
  }
}

/**
 * Validates that the input value has the required structure before mapping
 *
 * @param {Object} value - The data from the DAL
 * @throws {Error} If value is null, undefined, or missing required customer structure
 */
const protectAgainstNull = (value) => {
  if (value === null || value === undefined) {
    throw new Error('Personal details value cannot be null or undefined')
  }
  if (!value.customer) {
    throw new Error('Personal details value must contain a customer object')
  }

  if (!value.customer.info) {
    throw new Error('Customer must contain an info object')
  }
}
