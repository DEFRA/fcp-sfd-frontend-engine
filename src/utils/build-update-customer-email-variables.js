/**
 * Builds the GraphQL variables for the `updateCustomerEmail` mutation.
 *
 * @param {string} email - The new personal email address
 * @param {string} crn - The Customer Reference Number of the customer being updated
 * @returns {object} The mutation variables in the shape `{ input: { email: { address }, crn } }`
 */
export const buildUpdateCustomerEmailVariables = (email, crn) => {
  return {
    input: {
      email: {
        address: email
      },
      crn
    }
  }
}
