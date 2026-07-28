/**
 * Base presenter for formatting data for display
 */

/**
 * Formats the business name into back link text.
 * If the business name is greater than 50 characters, it will be truncated with an ellipsis.
*/
const BACK_LINK_DISPLAY_MAX = 50

export const formatBackLink = (businessName) => {
  if (businessName.length > BACK_LINK_DISPLAY_MAX) {
    return `Back to ${businessName.slice(0, BACK_LINK_DISPLAY_MAX)}…`
  }
  return `Back to ${businessName}`
}

/**
 * The first time a user loads the phone numbers change page they won't have entered any data, so a payload
 * or a changedNumber won't be present. If a user has a validation issue then we want to replay the payload data to them.
 * We check if payload is not undefined because it could be a user has removed the 'mobile' number for example but
 * incorrectly entered the telephone number so the payload for this would appear as an empty string.
 *
 * Payload is the priority to check and then after that if changedNumber is present then we display that value.
 *
 * @private
 */
export const formatNumber = (payloadNumber, changedNumber, originalNumber) => {
  if (payloadNumber !== undefined) {
    return payloadNumber
  }

  if (changedNumber !== undefined) {
    return changedNumber
  }

  return originalNumber
}

/**
 * Builds date of birth values for the form inputs.
 *
 * Values coming from `payloadDob` are always strings (they come from the form).
 * `changedDob` is saved payload data, so these values are also strings.
 *
 * The original date of birth value comes from the DAL and isn’t a string.
 * When falling back to those values we explicitly convert them to strings
 * so all sources are normalised and safe to use in inputs.
 *
 * Null values are handled to avoid showing 'null' in the UI.
 */
const formatDatePart = (changed, original) => {
  return changed ?? original?.toString() ?? ''
}

export const formatDateInputValues = (payloadDob, changedDob, originalDob) => {
  if (payloadDob) {
    return {
      day: payloadDob.day ?? '',
      month: payloadDob.month ?? '',
      year: payloadDob.year ?? ''
    }
  }

  return {
    day: formatDatePart(changedDob?.day, originalDob?.day),
    month: formatDatePart(changedDob?.month, originalDob?.month),
    year: formatDatePart(changedDob?.year, originalDob?.year)
  }
}

/**
 * Shared helper used by base presenters to sort validation errors so they
 * appear in the same order as the sections and fields shown on a Fix List page.
 *
 * Fix List pages are built dynamically depending on:
 * - which sections need fixing, and
 * - which field the user originally selected.
 *
 * Because of that, we can’t rely on the order of the validation object.
 * We need to deliberately sort the errors so they match:
 *   1. The order the sections appear on the page, and
 *   2. The logical order of fields within each section.
 *
 * This function keeps that logic in one reusable place so it can be used
 * by Business, Personal, or any future Fix List presenter.
 *
 * It returns the errors as an array, already arranged in the correct
 * display order for the UI.
 */
export const sortErrorsBySectionOrder = (errors, orderedSectionsToFix, SECTION_FIELD_ORDER) => {
  const sortedErrors = []

  for (const section of orderedSectionsToFix) {
    // A section (i.e 'address') can have multiple fields (i.e 'line1', 'line2', 'line3')
    const fieldsInSection = SECTION_FIELD_ORDER[section] || []

    for (const field of fieldsInSection) {
      // If there's an error for this field, add it to the sorted list with the error details
      if (errors[field]) {
        sortedErrors.push({
          field,
          ...errors[field]
        })
      }
    }
  }

  return sortedErrors
}
