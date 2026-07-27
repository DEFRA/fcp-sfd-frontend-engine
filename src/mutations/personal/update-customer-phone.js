export const updateCustomerPhoneMutation = `
  mutation UpdateCustomerPhone($input: UpdateCustomerPhoneInput!) {
    updateCustomerPhone(input: $input) {
      customer {
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
