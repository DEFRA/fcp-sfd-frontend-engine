/**
 * Builds the GraphQL variables for the `updateBusinessVAT` mutation.
 *
 * @param {string} vat - The new business VAT registration number
 * @param {string} sbi - The Single Business Identifier of the business being updated
 * @returns {object} The mutation variables in the shape `{ input: { vat, sbi } }`
 */

export const buildUpdateBusinessVatVariables = (vat, sbi) => {
  return {
    input: {
      vat,
      sbi
    }
  }
}
