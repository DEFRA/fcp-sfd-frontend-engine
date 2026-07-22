export const updateCustomerNameMutation = `
  mutation UpdateCustomerName($input: UpdateCustomerNameInput!) {
    updateCustomerName(input: $input) {
      customer {
        info {
          name {
            first
            last
            middle
          }
        }
      }
    }
  }
`
