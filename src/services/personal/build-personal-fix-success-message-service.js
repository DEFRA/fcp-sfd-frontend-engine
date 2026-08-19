/**
 * Builds a success notification message based on which personal details
 * were updated by the user.
 *
 * Returns either plain text (for a single change) or HTML (for multiple changes)
 * suitable for rendering inside a GOV.UK notification banner.
 * @module buildPersonalSuccessMessageService
 */

const buildPersonalSuccessMessageService = (personalDetails) => {
  const { orderedSectionsToFix } = personalDetails

  const changes = loopThroughSections(personalDetails, orderedSectionsToFix)

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

const loopThroughSections = (personalDetails, orderedSectionsToFix) => {
  const changes = []

  const labelMap = {
    name: 'full name',
    email: 'personal email address',
    phone: 'personal phone numbers',
    dob: 'date of birth',
    address: 'personal address'
  }

  const propertyMap = {
    name: 'changePersonalName',
    email: 'changePersonalEmail',
    phone: 'changePersonalPhoneNumbers',
    dob: 'changePersonalDob',
    address: 'changePersonalAddress'
  }

  for (const section of orderedSectionsToFix) {
    if (personalDetails[propertyMap[section]]) {
      changes.push(labelMap[section])
    }
  }

  return changes
}

export {
  buildPersonalSuccessMessageService
}
