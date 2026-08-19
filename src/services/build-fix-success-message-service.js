/**
 * Builds a success notification message based on which personal or business
 * details were updated by the user.
 *
 * Returns either plain text (for a single change), HTML (for multiple changes),
 * or null (when nothing changed) suitable for rendering inside a GOV.UK
 * notification banner.
 * @module buildFixSuccessMessageService
 */

const LABEL_MAPS = {
  personal: {
    name: 'full name',
    email: 'personal email address',
    phone: 'personal phone numbers',
    dob: 'date of birth',
    address: 'personal address'
  },
  business: {
    name: 'business name',
    email: 'business email address',
    phone: 'business phone numbers',
    vat: 'business vat number',
    address: 'business address'
  }
}

const PROPERTY_MAPS = {
  personal: {
    name: 'changePersonalName',
    email: 'changePersonalEmail',
    phone: 'changePersonalPhoneNumbers',
    dob: 'changePersonalDob',
    address: 'changePersonalAddress'
  },
  business: {
    name: 'changeBusinessName',
    email: 'changeBusinessEmail',
    phone: 'changeBusinessPhoneNumbers',
    vat: 'changeBusinessVat',
    address: 'changeBusinessAddress'
  }
}

const buildFixSuccessMessageService = (type, details) => {
  const { orderedSectionsToFix } = details

  const changes = loopThroughSections(type, details, orderedSectionsToFix)

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

const loopThroughSections = (type, details, orderedSectionsToFix) => {
  const changes = []

  // Pick the personal/business label and property maps for this journey type
  const labelMap = LABEL_MAPS[type]
  const propertyMap = PROPERTY_MAPS[type]

  // Loop through the ordered sections and check if each section has change data
  for (const section of orderedSectionsToFix) {
    // Only include a section if its change data is actually present
    if (details[propertyMap[section]]) {
      // Store the human-readable label rather than the raw section key
      changes.push(labelMap[section])
    }
  }

  return changes
}

export {
  buildFixSuccessMessageService
}
