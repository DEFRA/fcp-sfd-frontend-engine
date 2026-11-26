/**
 * Checks whether an email address is already registered to another customer.
 */

export const isCustomerEmailRegisteredQuery = `
  query IsCustomerEmailRegistered($email: String!) {
    isCustomerEmailRegistered(email: $email)
  }
`
