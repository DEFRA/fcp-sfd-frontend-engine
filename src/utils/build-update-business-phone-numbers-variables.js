/**
 * Builds the GraphQL variables for the `updateBusinessPhoneNumbers` mutation.
 *
 * @param {string|null} businessTelephone - The new business landline number
 * @param {string|null} businessMobile - The new business mobile number
 * @param {string} sbi = The Single Business Identifier of the business being updated
 * @returns {object} The mutation variables in the shape `{ input: { phone { landline, mobile }, sbi } }
 */

export const buildUpdateBusinessPhoneNumbersVariables = (businessTelephone, businessMobile, sbi) => {
  return {
    input: {
      phone: {
        landline: businessTelephone ?? null,
        mobile: businessMobile ?? null
      },
      sbi
    }
  }
}
