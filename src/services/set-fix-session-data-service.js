/**
 * Stores fix journey data on the session.
 *
 * This service is used during the interrupter journey to persist form data
 * as users progress through multiple steps. When users provide updates to
 * invalid personal or business details, their input is stored in the session
 * so it can be reviewed and submitted in later steps.
 *
 * The service automatically determines whether this is a personal or business
 * journey by examining the journeyKey parameter, then structures the payload
 * data according to the appropriate section-based schema.
 *
 * Why this matters:
 * - Users may need to fix multiple detail sections (e.g., name + address + email)
 * - Each section has its own set of fields defined in SECTION_FIELD_ORDER
 * - By organizing data by section, the review page can easily iterate and
 *   display each section with its corresponding fields
 * - Session storage preserves form state across page navigations
 *
 * Data structure example:
 * For personal details with sections ['name', 'email']:
 * {
 *   personalFixUpdates: {
 *     name: { first: 'John', middle: '', last: 'Doe' },
 *     email: { personalEmail: 'john@example.com' }
 *   }
 * }
 *
 * @module setFixSessionDataService
 */

import {
  PERSONAL_SECTION_FIELD_ORDER,
  BUSINESS_SECTION_FIELD_ORDER
} from '../constants/interrupter-journey.js'

/**
 * Maps form payload data into session storage, organized by detail sections.
 *
 * This function takes flat form submission data and restructures it into a
 * hierarchical object where each section (e.g., 'name', 'email', 'address')
 * contains its corresponding fields. Any fields missing from the payload
 * are populated with empty strings, ensuring the session always has a
 * complete structure for downstream presenters and services.
 *
 * The section-based structure is essential because:
 * 1. The fix journey is organized by sections that need fixing
 * 2. The review page displays each section separately
 * 3. The mutation needs to know which fields belong to which section
 * 4. Presenters can easily iterate sections and their fields
 *
 * @param {Object} yar - Hapi session object with get/set methods
 * @param {Object} sessionData - Current session data object to be mutated
 * @param {Object} payload - Flat form submission data (e.g., { first: 'John', last: 'Doe', personalEmail: '...' })
 * @param {Array<string>} orderedSectionsToFix - Array of section names being fixed, in display order
 *                        Example: ['name', 'address', 'email'] - order matches the presentation order
 * @param {string} journeyKey - Session key that identifies the journey type
 *                              - 'personalDetailsValidation' for personal details
 *                              - 'businessDetailsValidation' for business details
 *                              This key is used to auto-detect the journey type
 * @param {string} updateKey - Object key where the structured updates are stored
 *                              - 'personalFixUpdates' for personal details
 *                              - 'businessFixUpdates' for business details
 *
 * @returns {void} Modifies sessionData in place and persists via yar.set()
 *
 * @example
 * // Store personal detail updates
 * setFixSessionDataService(
 *   yar,
 *   sessionData,
 *   { first: 'Jane', last: '', personalEmail: 'jane@example.com' },
 *   ['name', 'email'],
 *   'personalDetailsValidation',
 *   'personalFixUpdates'
 * )
 * // Result: sessionData.personalFixUpdates = {
 * //   name: { first: 'Jane', middle: '', last: '' },
 * //   email: { personalEmail: 'jane@example.com' }
 * // }
 */
const setFixSessionDataService = (
  yar,
  sessionData,
  payload,
  orderedSectionsToFix,
  journeyKey,
  updateKey
) => {
  // Determine type from journey key
  // This allows the service to auto-select the correct field schema
  const type = journeyKey === 'businessDetailsValidation' ? 'business' : 'personal'

  // Select the appropriate field order based on type
  // Each type (personal/business) has different fields for each section
  const SECTION_FIELD_ORDER = type === 'business' ? BUSINESS_SECTION_FIELD_ORDER : PERSONAL_SECTION_FIELD_ORDER

  const fixUpdates = {}

  // Loop through each section that needs fixing (e.g. name, email)
  // The order is preserved from orderedSectionsToFix
  for (const section of orderedSectionsToFix) {
    const fields = SECTION_FIELD_ORDER[section]

    fixUpdates[section] = {}

    // Loop through each field in the section (e.g. firstName, lastName)
    // This ensures all expected fields are present in the session,
    // even if they weren't provided in the form submission
    for (const field of fields) {
      // Map the payload value to the session data, defaulting to an empty string if not provided
      // Empty strings are used as defaults to maintain a consistent structure
      // for downstream presenters and mutation builders
      fixUpdates[section][field] = payload[field] ?? ''
    }
  }

  // Store the structured updates in the session under the appropriate key
  sessionData[updateKey] = fixUpdates
  // Persist the updated session data
  yar.set(journeyKey, sessionData)
}

export {
  setFixSessionDataService
}
