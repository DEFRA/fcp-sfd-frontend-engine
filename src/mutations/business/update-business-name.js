export const updateBusinessNameMutation = `
  mutation UpdateBusinessName($input: UpdateBusinessNameInput!) {
    updateBusinessName(input: $input) {
      business {
        info {
          name
        }
      }
      success
    }
  }
`
