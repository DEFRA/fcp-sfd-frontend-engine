/**
 * Updates any combination of business name, email, phone, VAT and address.
 */

export const updateBusinessDetailsMutation = `
  mutation UpdateBusinessAllFields($input: UpdateBusinessAllFieldsInput!) {
    updateBusinessAllFields(input: $input) {
      success
    }
  }
`
