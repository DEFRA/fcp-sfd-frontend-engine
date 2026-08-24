export const updateBusinessRegistrationNumbersMutation = `
  mutation UpdateBusinessRegistrationNumbers($input: UpdateBusinessRegistrationNumbersInput!) {
    updateBusinessRegistrationNumbers(input: $input) {
      business {
        info {
          registrationNumbers {
            companiesHouse
            charityCommission
          }
        }
      }
      success
    }
  }
`
