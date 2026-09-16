/**
 * Takes the raw customer name data and maps it to a more usable format
 *
 * @param {Object} value - The data from the DAL
 *
 * @returns {string} Formatted customer name
 */

export const mapCustomerName = (name = {}) => {
  return [
    name.first,
    name.last
  ].filter(Boolean).join(' ')
}
