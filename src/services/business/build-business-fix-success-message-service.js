/**
 * Builds a success notification message based on which business details
 * were updated by the user.
 *
 * Returns either plain text (for a single change) or HTML (for multiple changes)
 * suitable for rendering inside a GOV.UK notification banner.
 * @module buildBusinessSuccessMessageService
 */

const buildBusinessSuccessMessageService = (businessDetails) => {
  const { orderedSectionsToFix } = businessDetails

  const changes = loopThroughSections(businessDetails, orderedSectionsToFix)

  if (changes.length === 0) {
    return null
  }

  if (changes.length === 1) {
    return {
      type: 'text',
      value: `You have updated your ${changes[0]}`
    }
  }

  return {
    type: 'html',
    value: `
      <h3 class="govuk-notification-banner__heading">
        You have updated your:
      </h3>
      <ul class="govuk-list govuk-list--bullet">
        ${changes.map(change => `<li>${change}</li>`).join('')}
      </ul>
    `
  }
}

const loopThroughSections = (businessDetails, orderedSectionsToFix) => {
  const changes = []

  const labelMap = {
    name: 'business name',
    email: 'business email address',
    phone: 'business phone numbers',
    vat: 'business vat number',
    address: 'business address'
  }

  const propertyMap = {
    name: 'changeBusinessName',
    email: 'changeBusinessEmail',
    phone: 'changeBusinessPhoneNumbers',
    vat: 'changeBusinessVat',
    address: 'changeBusinessAddress'
  }

  for (const section of orderedSectionsToFix) {
    if (businessDetails[propertyMap[section]]) {
      changes.push(labelMap[section])
    }
  }

  return changes
}

export {
  buildBusinessSuccessMessageService
}
