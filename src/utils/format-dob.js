import moment from 'moment'

/**
 * Formats a date of birth into a formatted display string and action text.
 *
 * Returns:
 * - If the date is missing or invalid: "Not added" with action "Add"
 * - If the date is in the future or after today: "Not added" with action "Add"
 * - If the date is valid and in the past: formatted date (e.g. "15 March 1990") with action "Change"
 *
 * @param {string} dob - The date of birth in a format moment can parse (e.g. "1990-03-15")
 *
 * @returns {{ formattedDob: string, action: string }}
 */
export const formatDob = (dob) => {
  if (!dob) {
    return { formattedDob: 'Not added', action: 'Add' }
  }

  const dobMoment = moment(dob)

  if (!dobMoment.isValid() || dobMoment.isAfter(moment(), 'day')) {
    return { formattedDob: 'Not added', action: 'Add' }
  }

  return {
    formattedDob: dobMoment.format('D MMMM YYYY'),
    action: 'Change'
  }
}
