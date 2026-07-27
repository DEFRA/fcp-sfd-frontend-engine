export const updateCustomerEmailMutation = `
  mutation UpdateCustomerEmail($input: UpdateCustomerEmailInput!) {
    updateCustomerEmail(input: $input) {
      customer {
        info {
          email {
            address
          }
        }
      }
    }
  }
`
