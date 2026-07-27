/**
 * Builds the GraphQL variables for the `updateBusinessEmail` mutation.
 *
 * @param {string} email - The new business email address
 * @param {string} sbi - The Single Business Identifier of the business being updated
 * @returns {object} The mutation variables in the shape `{ input: { email: { address }, sbi } }`
 */
export const buildUpdateBusinessEmailVariables = (email, sbi) => {
  return { input: { email: { address: email }, sbi } }
}
