export const updateCustomerDetailsMutation = `
  mutation UpdateCustomerAllFields($input: UpdateCustomerAllFieldsInput!) {
    updateCustomerAllFields(input: $input) {
      success
      customer {
        info {
          name {
            first
            middle
            last
          }
          dateOfBirth
          phone {
            mobile
            landline
          }
          email {
            address
          }
          address {
            line1
            line2
            line3
            line4
            line5
            buildingNumberRange
            buildingName
            flatName
            street
            city
            county
            postalCode
            country
            uprn
          }
        }
      }
    }
  }
`
