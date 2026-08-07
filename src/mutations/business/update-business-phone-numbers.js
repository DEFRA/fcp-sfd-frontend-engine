export const updateBusinessPhoneNumbersMutation = `
  mutation UpdateBusinessPhoneNumbers($input: UpdateBusinessPhoneInput!) {
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
