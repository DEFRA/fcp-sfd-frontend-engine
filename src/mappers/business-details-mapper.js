/**
 * Takes the raw business details data from the DAL and maps it to a more usable format.
 *
 * Maps the core business fields, `address`, and contact fields onto a single flat object.
 * Callers that need additional fields (e.g. `customer`) should extend the result.
 *
 * @param {Object} value - The raw data from the DAL
 *
 * @returns {Object} Mapped business details
 */

import { mapAddress } from './address-mapper.js'

const asNullable = (value) => value ?? null

export const mapBusinessDetails = (value) => {
  const business = value?.business ?? {}
  const info = business.info ?? {}
  const registrationNumbers = info.registrationNumbers ?? {}

  return {
    sbi: business.sbi,
    businessName: asNullable(info.name),
    vat: asNullable(info.vat),
    traderNumber: asNullable(info.traderNumber),
    vendorNumber: asNullable(info.vendorNumber),
    legalStatus: asNullable(info.legalStatus?.type),
    legalStatusCode: asNullable(info.legalStatus?.code),
    registrationNumbers: {
      companiesHouse: asNullable(registrationNumbers.companiesHouse),
      charityCommission: asNullable(registrationNumbers.charityCommission)
    },
    type: asNullable(info.type?.type),
    countyParishHoldingNumbers: business.countyParishHoldings ?? [],
    address: mapAddress(info.address),
    email: asNullable(info.email?.address),
    landline: asNullable(info.phone?.landline),
    mobile: asNullable(info.phone?.mobile)
  }
}
