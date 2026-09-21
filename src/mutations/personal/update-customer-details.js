/**
 * Updates any combination of personal name, email, phone, and address.
 */

export const updateCustomerDetailsMutation = `
  mutation UpdateCustomerAllFields($input: UpdateCustomerAllFieldsInput!) {
    updateCustomerAllFields(input: $input) {
      success
    }
  }
`
