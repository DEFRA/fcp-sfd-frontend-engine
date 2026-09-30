/**
 * Builds the GraphQL variables for the `updateCustomerDob` mutation.
 *
 * The DAL expects `dateOfBirth` as a zero padded ISO date e.g. '1990-04-05' not '1990-4-5'.
 *
 * @param {string|number} day - The day of the month the customer was born
 * @param {string|number} month - The month the customer was born
 * @param {string|number} year - The year the customer was born
 * @param {string} crn - The Customer Reference Number of the customer being updated
 * @returns {object} The mutation variables in the shape `{ input: { dateOfBirth, crn } }`
 */
export const buildUpdateCustomerDobVariables = (day, month, year, crn) => {
  const dateOfBirth = [
    String(year).padStart(4, '0'),
    String(month).padStart(2, '0'),
    String(day).padStart(2, '0')
  ].join('-')

  return {
    input: {
      dateOfBirth,
      crn
    }
  }
}
