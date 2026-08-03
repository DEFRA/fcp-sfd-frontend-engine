export const updateBusinessEmailMutation = `
  mutation UpdateBusinessEmail($input: UpdateBusinessEmailInput!) {
    updateBusinessEmail(input: $input) {
      business {
        info {
          email {
            address
          }
        }
      }
      success
    }
  }
`
