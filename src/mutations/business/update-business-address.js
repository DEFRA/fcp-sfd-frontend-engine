export const updateBusinessAddressMutation = `
  mutation UpdateBusinessAddress($input: UpdateBusinessAddressInput!) {
    updateBusinessAddress(input: $input) {
      business {
        info {
          address {
            line1
            line2
            line3
            line4
            line5
            postalCode
            country
            city
            buildingNumberRange
            buildingName
            flatName
            street
            county
            uprn
          }
        }
      }
    }
  }
`
