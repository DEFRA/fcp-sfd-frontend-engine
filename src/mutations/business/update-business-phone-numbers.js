export const updateBusinessPhoneNumbersMutation = `
  mutation UpdateBusinessPhoneNumbers($input: UpdateBusinessPhoneNumbersInput!) {
    updateBusinessPhone(input: $input) {
      business {
        info {
          phone {
            landline
            mobile
          }
        }
      }
    }
  }
`
