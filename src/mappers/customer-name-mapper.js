/**
 * Takes the raw customer name data and maps it to a more usable format
 *
 * @param {Object} value - The data from the DAL
 *
 * @returns {Object} Formatted customer name data
 */

export const mapCustomerName = (name = {}) => {
  return {
    customer: {
      userName: [
        name.first,
        name.last
      ].filter(Boolean).join(' ')
    }
  }
}
