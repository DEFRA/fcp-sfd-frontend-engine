export const updateBusinessLegalStatusMutation = `
  mutation UpdateBusinessLegalStatus($input: UpdateBusinessLegalStatusInput!) {
    updateBusinessLegalStatus(input: $input) {
      business {
        info {
          legalStatus {
            code
            type
          }
        }
      }
      success
    }
  }
`
