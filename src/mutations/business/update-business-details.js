export const updateBusinessDetailsMutation = `
  mutation UpdateBusinessAllFields($input: UpdateBusinessAllFieldsInput!) {
    updateBusinessAllFields(input: $input) {
      success
      business {
        info {
          name
          email {
            address
          }
          phone {
            mobile
            landline
          }
          vat
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
