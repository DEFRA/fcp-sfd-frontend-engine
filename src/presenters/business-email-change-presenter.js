/**
 * Formats the shared data for the business email change page.
 *
 * Link computation is app-specific, so the consuming service passes in the
 * resolved `backLink` object.
 *
 * @param {object} data - The merged business details (including any pending `changeBusinessEmail`)
 * @param {string} [payload] - The value submitted by the user, replayed on validation failure
 * @param {object} backLink - The back link object to render on the page
 * @returns {object} The formatted page data
 */
export const businessEmailChangePresenter = (data, payload, backLink) => {
  return {
    backLink,
    pageTitle: 'What is your business email address?',
    metaDescription: 'Update the email address for your business.',
    userName: data.customer?.userName ?? null,
    businessEmail: payload ?? data.changeBusinessEmail ?? data.contact.email,
    businessName: data.info.businessName ?? null,
    sbi: data.info.sbi ?? null
  }
}
