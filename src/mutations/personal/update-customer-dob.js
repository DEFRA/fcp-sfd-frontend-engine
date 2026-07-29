export const updateCustomerDobMutation = `
  mutation UpdateCustomerDateOfBirth($input: UpdateCustomerDateOfBirthInput!) {
    updateCustomerDateOfBirth(input: $input) {
      customer {
        info {
          dateOfBirth
        }
      }
    }
  }
`
