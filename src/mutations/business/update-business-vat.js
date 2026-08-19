export const updateBusinessVatMutation = `
  mutation UpdateBusinessVAT($input: UpdateBusinessVATInput!) {
  updateBusinessVAT(input: $input) {
    business {
      info {
        vat
      }
    }
    success
  }
}
`
