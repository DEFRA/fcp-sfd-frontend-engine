import { buildDateFromParts } from './build-date-from-parts.js'

/**
 * Builds the GraphQL variables for the `updateCustomerDob` mutation.
 *
 * @param {object} dob - The date of birth parts captured from the date input
 * @param {string|number} dob.day - The day of the month
 * @param {string|number} dob.month - The month of the year
 * @param {string|number} dob.year - The four digit year
 * @param {string} crn - The Customer Reference Number of the customer being updated
 * @returns {object} The mutation variables in the shape `{ input: { dateOfBirth, crn } }`
 */
export const buildUpdatePersonalDobVariables = (dob, crn) => {
  return {
    input: {
      dateOfBirth: buildDateFromParts(dob),
      crn
    }
  }
}
