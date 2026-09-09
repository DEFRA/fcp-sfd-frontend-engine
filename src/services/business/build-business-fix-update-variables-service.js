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
  for (const applySection of sectionAppliers) {
    applySection(input, businessDetails, orderedSectionsToFix)
  }

  return { input }
}

const applyAddressSection = (input, businessDetails, orderedSectionsToFix) => {
  if (orderedSectionsToFix.includes('address') && businessDetails.changeBusinessAddress) {
    input.address = { withoutUprn: buildManualAddress(businessDetails.changeBusinessAddress) }
  }
}

const applyEmailSection = (input, businessDetails, orderedSectionsToFix) => {
  if (orderedSectionsToFix.includes('email') && businessDetails.changeBusinessEmail) {
    Object.assign(input, buildEmailInput(businessDetails.changeBusinessEmail))
  }
}

const applyNameSection = (input, businessDetails, orderedSectionsToFix) => {
  if (orderedSectionsToFix.includes('name') && businessDetails.changeBusinessName) {
    input.name = businessDetails.changeBusinessName.businessName
  }
}

const applyPhoneSection = (input, businessDetails, orderedSectionsToFix) => {
  if (orderedSectionsToFix.includes('phone') && businessDetails.changeBusinessPhoneNumbers) {
    Object.assign(input, buildPhoneInput(businessDetails.changeBusinessPhoneNumbers))
  }
}

const applyVatSection = (input, businessDetails, orderedSectionsToFix) => {
  if (orderedSectionsToFix.includes('vat') && businessDetails.changeBusinessVat !== null) {
    input.vat = businessDetails.changeBusinessVat.vatNumber ?? ''
  }
}

const sectionAppliers = [
  applyAddressSection,
  applyEmailSection,
  applyNameSection,
  applyPhoneSection,
  applyVatSection
]

const buildEmailInput = (change) => {
  return {
    email: {
      address: change.businessEmail
    }
  }
}

const buildPhoneInput = (change) => {
  return {
    phone: {
      landline: change.businessTelephone ?? null,
      mobile: change.businessMobile ?? null
    }
  }
}

export {
  buildBusinessFixUpdateVariablesService
}
