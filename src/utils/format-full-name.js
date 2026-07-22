/**
 * Joins the parts of a name (first, middle, last) into a single display string,
 * omitting any empty parts.
 *
 * @param {object} nameData - An object with `first`, `middle` and `last` name parts
 * @returns {string} The formatted full name
 */
export const formatFullName = (nameData) => {
  return [
    nameData.first,
    nameData.middle,
    nameData.last
  ].filter(Boolean).join(' ')
}
