/**
 * Initialises the fix journey in the user's session.
 *
 * This service is the single place where the fix journey order is defined.
 * It calculates and stores the ordered list of either personal or business
 * detail sections that the user needs to fix.
 *
 * This sets:
 * - orderedSectionsToFix: the ordered list of sections to fix
 * - source: the section the user selected to start the journey (if provided)
 *
 * If a source is provided, that section is placed first, followed by the
 * remaining sections in the order defined by this service.
 *
 * Downstream routes and presenters read this data from the session and
 * don't reorder it.
 *
 * @module initialiseFixJourneyService
 */

import {
  PERSONAL_SECTION_ORDER,
  BUSINESS_SECTION_ORDER
} from '../constants/interrupter-journey.js'

/**
 * Initialises the fix journey session data.
 *
 * @param {Object} yar - Hapi session object
 * @param {string} source - The section user clicked to fix (optional)
 * @param {string} journeyType - Either 'personal' or 'business'
 * @returns {Object|null} Updated session data or null if no sections need fixing
 */
const initialiseFixJourneyService = (yar, source, journeyType) => {
  // Determined by journeyType
  let sessionKey
  let sectionOrder = []

  if (journeyType === 'business') {
    sessionKey = 'businessDetailsValidation'
    sectionOrder = BUSINESS_SECTION_ORDER
  }

  if (journeyType === 'personal') {
    sessionKey = 'personalDetailsValidation'
    sectionOrder = PERSONAL_SECTION_ORDER
  }

  const sessionData = yar.get(sessionKey)

  if (!sessionData?.sectionsNeedingUpdate) {
    return sessionData
  }

  const orderedSectionsToFix = orderSectionsToFix(
    sessionData.sectionsNeedingUpdate,
    source,
    sectionOrder
  )

  updateSessionData(sessionData, source, orderedSectionsToFix)

  yar.set(sessionKey, sessionData)

  return sessionData
}

/**
 * Updates session data with the ordered sections and clears temporary fields.
 *
 * @param {Object} sessionData - The session data to update
 * @param {string} source - The selected section (optional)
 * @param {Array<string>} orderedSectionsToFix - Ordered list of sections to fix
 */
const updateSessionData = (sessionData, source, orderedSectionsToFix) => {
  sessionData.orderedSectionsToFix = orderedSectionsToFix

  // Clean up temporary fields used only during validation
  delete sessionData.sectionsNeedingUpdate
  delete sessionData.personalFixUpdates
  delete sessionData.businessFixUpdates

  if (source) {
    sessionData.source = source
  }
}

/**
 * Returns an ordered list of sections that the user needs to fix.
 *
 * Sections are ordered based on how the personal/business details data
 * is presented on the main page.
 *
 * If a source is provided, that section is moved to the top of the list.
 * Source indicates which link the user clicked to get to the fix list page.
 *
 * @param {Array<string>} sectionsNeedingUpdate - Sections identified as needing fixes
 * @param {string} source - The section user clicked on (optional)
 * @param {Array<string>} SECTION_ORDER - The defined order for sections
 * @returns {Array<string>} Ordered list of sections to fix
 */
const orderSectionsToFix = (sectionsNeedingUpdate, source, SECTION_ORDER) => {
  const sections = SECTION_ORDER.filter((section) => {
    return sectionsNeedingUpdate.includes(section)
  })

  if (!source) {
    return sections
  }

  // Source comes from a URL query param, so only allow known section keys
  // for this journey type to avoid injecting unexpected values into session state.
  if (!SECTION_ORDER.includes(source)) {
    return sections
  }

  return [
    source,
    ...sections.filter(section => section !== source)
  ]
}

export {
  initialiseFixJourneyService
}
