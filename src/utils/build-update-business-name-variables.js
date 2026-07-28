/**
 * Builds the GraphQL variables for the `updateBusinessName` mutation.
 *
 * @param {string} name - The new business name
 * @param {string} sbi - The Single Business Identifier of the business being updated
 * @returns {object} The mutation variables in the shape `{ input: { name, sbi } }`
 */
export const buildUpdateBusinessNameVariables = (name, sbi) => {
  return { input: { name, sbi } }
}
