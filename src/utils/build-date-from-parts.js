/**
 * Builds an ISO 8601 date string from separate day, month and year parts.
 *
 * The DAL expects dates in `YYYY-MM-DD` format, so the year, day and month are
 * zero padded e.g. `{ day: '5', month: '4', year: '1990' }` becomes `'1990-04-05'`.
 *
 * @param {object} parts - The date parts captured from a GDS date input
 * @param {string|number} parts.day - The day of the month
 * @param {string|number} parts.month - The month of the year
 * @param {string|number} parts.year - The four digit year
 * @returns {string} The date in `YYYY-MM-DD` format
 */
export const buildDateFromParts = ({ day, month, year }) => {
  return `${String(year).padStart(4, '0')}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`
}
