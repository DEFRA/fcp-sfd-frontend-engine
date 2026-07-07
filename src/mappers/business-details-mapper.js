/**
 * Takes the raw business details data from the DAL and maps it to a more usable format.
 *
 * Maps the core `info`, `address`, and `contact` fields.
 * Callers that need additional fields (e.g. `customer`) should extend the result.
 *
 * @param {Object} value - The raw data from the DAL
 *
 * @returns {Object} Mapped business details with `info`, `address`, and `contact`
 */

import { mapAddress } from './address-mapper.js'

const asNullable = (value) => value ?? null

const mapBusinessInfo = (business) => {
  const info = business.info ?? {}

  return {
    sbi: business.sbi,
    businessName: asNullable(info.name),
    vat: asNullable(info.vat),
    traderNumber: asNullable(info.traderNumber),
    vendorNumber: asNullable(info.vendorNumber),
    legalStatus: asNullable(info.legalStatus?.type),
    type: asNullable(info.type?.type),
    countyParishHoldingNumbers: business.countyParishHoldings ?? []
  }
}

const mapBusinessContact = (businessInfo) => {
  return {
    email: asNullable(businessInfo.email?.address),
    landline: asNullable(businessInfo.phone?.landline),
    mobile: asNullable(businessInfo.phone?.mobile)
  }
}

export const mapBusinessDetails = (value) => {
  const business = value?.business ?? {}
  const businessInfo = business.info ?? {}

  return {
    info: mapBusinessInfo(business),
    address: mapAddress(businessInfo.address),
    contact: mapBusinessContact(businessInfo)
  }
}
