/**
 * Builds the GraphQL variables for the `updateCustomerPhone` mutation.
 *
 * @param {string|null} personalTelephone - The new personal landline number
 * @param {string|null} personalMobile - The new personal mobile number
 * @param {string} crn - The Customer Reference Number of the customer being updated
 * @returns {object} The mutation variables in the shape `{ input: { phone: { landline, mobile }, crn } }`
 */
export const buildUpdateCustomerPhoneVariables = (personalTelephone, personalMobile, crn) => {
  return {
    input: {
      phone: {
        landline: personalTelephone ?? null,
        mobile: personalMobile ?? null
      },
      crn
    }
  }
}
