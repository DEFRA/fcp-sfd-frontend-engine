/**
 * Takes the raw data and maps it to a more usable format
 *
 * @param {Object} value - The data from the DAL
 *
 * @returns {Object} Formatted personal business details data
 */

import { mappers } from './mappers'

export const mapPersonalBusinessDetails = (value) => {
  return {
    info: { ...mappers.customerName(value.customer.info.name) },
    business: {
      info: {
        organisationId: value.business.organisationId ?? null,
        sbi: value.business.sbi ?? null,
        name: value.business.info.name ?? null
      }
    }
  }
}
