/**
 * Shared presenter helpers for the "View and update your business details" page.
 *
 * These functions are identical across the internal and external frontend
 * applications and are provided here to avoid duplication.
 */

import { formatDisplayAddress } from './base-presenter.js'

/**
 * Returns the action text for a summary-list row.
 *
 * Returns 'Change' when a value is already present, or 'Add' when it is absent.
 *
 * @param {*} value - The current field value
 *
 * @returns {'Change'|'Add'}
 */
export const getActionText = (value) => {
  return value ? 'Change' : 'Add'
}

/**
 * Extracts an array of CPH number strings from the raw DAL response.
 *
 * Filters out any objects that have a null or undefined `cphNumber` property.
 *
 * @param {Array<Object>} countyParishHoldings - Raw CPH objects from the DAL
 *
 * @returns {string[]} Array of CPH number strings
 */
export const formatCph = (countyParishHoldings) => {
  return (countyParishHoldings || [])
    .filter((cph) => cph?.cphNumber)
    .map((cph) => cph.cphNumber)
}

/**
 * Returns the heading text for the CPH summary-list row.
 *
 * Uses the singular form when `count` is 1, plural otherwise.
 *
 * @param {number} count - Number of CPH numbers
 *
 * @returns {string}
 */
export const formatCphText = (count) => {
  return `County Parish Holding (CPH) number${count > 1 ? 's' : ''}`
}

/**
 * Formats a business address object into an array of display lines.
 *
 * Returns an empty array when the address contains no recognised content
 * (i.e. neither a UPRN from a lookup nor a manually entered first line).
 *
 * @param {Object} businessAddress - The mapped address object
 *
 * @returns {string[]} Array of address lines, or an empty array if absent
 */
export const formatBusinessAddress = (businessAddress) => {
  if (businessAddress?.lookup?.uprn || businessAddress?.manual?.line1) {
    return formatDisplayAddress(businessAddress)
  }

  return []
}
