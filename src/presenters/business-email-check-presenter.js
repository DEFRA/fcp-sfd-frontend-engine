/**
 * Formats the shared data for the business email check page.
 *
 * Link computation is app-specific, so the consuming service passes in the
 * resolved `backLink` and `changeLink`.
 *
 * @param {object} data - The merged business details (including any pending `changeBusinessEmail`)
 * @param {object} backLink - The back link object to render on the page
 * @param {string} changeLink - The href for the "Change" action
 * @returns {object} The formatted page data
 */
export const businessEmailCheckPresenter = (data, backLink, changeLink) => {
  return {
    backLink,
    changeLink,
    pageTitle: 'Check your business email address is correct before submitting',
    metaDescription: 'Check the email address for your business is correct.',
    userName: data.customer?.userName ?? null,
    businessEmail: data.changeBusinessEmail ?? data.contact.email,
    businessName: data.info.businessName ?? null,
    sbi: data.info.sbi ?? null
  }
}
