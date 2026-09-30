/**
 * Builds the GraphQL variables for the `updateCustomerName` mutation.
 *
 * @param {string} first - The customer's first name
 * @param {string} last - The customer's last name
 * @param {string|null} middle - The customer's middle name(s)
 * @param {string} crn - The Customer Reference Number of the customer being updated
 * @returns {object} The mutation variables in the shape `{ input: { first, last, middle, crn } }`
 */
export const buildUpdateCustomerNameVariables = (first, last, middle, crn) => {
  return {
    input: {
      first,
      last,
      middle: middle ?? null,
      crn
    }
  }
}
