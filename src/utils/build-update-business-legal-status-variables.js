/**
 * Builds the GraphQL variables for the `updateBusinessLegalStatus` mutation.
 *
 * @param {string|number} legalStatusCode - The new legal status code for the business
 * @param {string} sbi - The Single Business Identifier of the business being updated
 * @returns {object} The mutation variables in the shape `{ input: { sbi, legalStatusCode } }`
 */
export const buildUpdateBusinessLegalStatusVariables = (legalStatusCode, sbi) => {
  return {
    input: {
      sbi,
      legalStatusCode: Number(legalStatusCode)
    }
  }
}
