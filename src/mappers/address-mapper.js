/**
 * Takes the raw address data and maps it to a more usable format
 *
 * @param {Object} address - The raw address data
 *
 * @returns {Object} Formatted address data
 */
export const mapAddress = (address = {}) => {
  return {
    address: {
      lookup: {
        pafOrganisationName: address.pafOrganisationName,
        buildingNumberRange: address.buildingNumberRange,
        flatName: address.flatName,
        buildingName: address.buildingName,
        dependentLocality: address.dependentLocality,
        doubleDependentLocality: address.doubleDependentLocality,
        street: address.street,
        county: address.county,
        uprn: address.uprn
      },
      manual: {
        line1: address.line1,
        line2: address.line2,
        line3: address.line3,
        line4: address.line4,
        line5: address.line5
      },
      city: address.city,
      postcode: address.postalCode,
      country: address.country
    }
  }
}
