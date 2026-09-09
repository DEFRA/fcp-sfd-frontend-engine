/**
 * Builds mutation variables for updating a business's details via the fix journey.
 * Only includes the sections that actually need updating, using the
 * unified `input` format for the GraphQL mutation.
 *
 * @module buildBusinessFixUpdateVariablesService
 */

import { buildManualAddress } from '../build-address-variables-service.js'

const buildBusinessFixUpdateVariablesService = (businessDetails) => {
  const { orderedSectionsToFix, info } = businessDetails
  const { sbi } = info

  const input = { sbi }

  // Conditionally merge each section into input if it's been updated by the user
  if (orderedSectionsToFix.includes('name') && businessDetails.changeBusinessName) {
    input.name = businessDetails.changeBusinessName.businessName
  }

  if (orderedSectionsToFix.includes('email') && businessDetails.changeBusinessEmail) {
    Object.assign(input, buildEmailInput(businessDetails.changeBusinessEmail))
  }

  if (orderedSectionsToFix.includes('phone') && businessDetails.changeBusinessPhoneNumbers) {
    Object.assign(input, buildPhoneInput(businessDetails.changeBusinessPhoneNumbers))
  }

  if (orderedSectionsToFix.includes('vat') && businessDetails.changeBusinessVat !== null) {
    input.vat = businessDetails.changeBusinessVat.vatNumber ?? ''
  }

  if (orderedSectionsToFix.includes('address') && businessDetails.changeBusinessAddress) {
    input.address = { withoutUprn: buildManualAddress(businessDetails.changeBusinessAddress) }
  }

  return { input }
}

const buildPhoneInput = (change) => {
  return {
    phone: {
      landline: change.businessTelephone ?? null,
      mobile: change.businessMobile ?? null
    }
  }
}

const buildEmailInput = (change) => {
  return {
    email: {
      address: change.businessEmail
    }
  }
}

export {
  buildBusinessFixUpdateVariablesService
}
