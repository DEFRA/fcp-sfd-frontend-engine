/**
 * Builds the GraphQL variables for the `updateBusinessRegistrationNumbers` mutation.
 *
 * @param {string|null} companiesHouse - The Companies House registration number
 * @param {string|null} charityCommission - The Charity Commission registration number
 * @param {string} sbi - The Single Business Identifier of the business being updated
 * @returns {object} The mutation variables in the shape
 * `{ input: { sbi, registrationNumbers: { companiesHouse, charityCommission } } }`
 */
export const buildUpdateBusinessRegistrationNumbersVariables = (companiesHouse, charityCommission, sbi) => {
  return {
    input: {
      sbi,
      registrationNumbers: {
        companiesHouse: companiesHouse ?? null,
        charityCommission: charityCommission ?? null
      }
    }
  }
}
