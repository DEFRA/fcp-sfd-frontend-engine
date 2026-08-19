/**
 * Builds mutation variables for updating a user's personal details via the fix journey.
 * Only includes the sections that actually need updating, using the
 * unified `input` format for the GraphQL mutation.
 *
 * @module buildCustomerFixUpdateVariablesService
 */

import { buildManualAddress } from '../build-address-variables-service.js'

const buildCustomerFixUpdateVariablesService = (personalDetails) => {
  const { orderedSectionsToFix, crn } = personalDetails

  const input = { crn }

  // Conditionally merge each section into input if it's been updated by the user
  if (orderedSectionsToFix.includes('name') && personalDetails.changePersonalName) {
    Object.assign(input, buildNameInput(personalDetails.changePersonalName))
  }

  if (orderedSectionsToFix.includes('email') && personalDetails.changePersonalEmail) {
    Object.assign(input, buildEmailInput(personalDetails.changePersonalEmail))
  }

  if (orderedSectionsToFix.includes('phone') && personalDetails.changePersonalPhoneNumbers) {
    Object.assign(input, buildPhoneInput(personalDetails.changePersonalPhoneNumbers))
  }

  if (orderedSectionsToFix.includes('dob') && personalDetails.changePersonalDob) {
    Object.assign(input, buildDobInput(personalDetails.changePersonalDob))
  }

  if (orderedSectionsToFix.includes('address') && personalDetails.changePersonalAddress) {
    Object.assign(input, { address: buildManualAddress(personalDetails.changePersonalAddress) })
  }

  return { input }
}

const buildPhoneInput = (change) => {
  return {
    phone: {
      landline: change.personalTelephone ?? null,
      mobile: change.personalMobile ?? null
    }
  }
}

const buildEmailInput = (change) => {
  return {
    email: {
      address: change.personalEmail
    }
  }
}

const buildNameInput = (change) => {
  return {
    first: change.first,
    middle: change.middle ?? null,
    last: change.last
  }
}

const buildDobInput = (change) => {
  const { day, month, year } = change

  return {
    // DAL expects dateOfBirth as YYYY-MM-DD e.g. '1990-04-05' not '1990-4-5'
    dateOfBirth: `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`
  }
}

export {
  buildCustomerFixUpdateVariablesService
}
