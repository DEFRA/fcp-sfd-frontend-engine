/**
 * Generic multi-schema validation service.
 *
 * - Validates multiple Joi schemas independently
 * - Collects all validation errors
 * - Maps errors to form sections
 */
export const validateDetailsService = (schemasToValidate, mappedDetails) => {
  const errors = []

  for (const schema of schemasToValidate) {
    const result = schema.validate(mappedDetails, {
      abortEarly: false,
      allowUnknown: true
    })

    if (result.error) {
      errors.push(...result.error.details)
    }
  }

  if (errors.length === 0) {
    return {
      isValid: true,
      sectionsNeedingUpdate: []
    }
  }

  return {
    isValid: false,
    sectionsNeedingUpdate: mapErrorsToSections(errors)
  }
}

/**
 * Turns validation errors into a list of form sections with problems.
 *
 * If multiple errors relate to the same field, the field is only
 * returned once.
 */
const mapErrorsToSections = (errorDetails) => {
  const errorFieldToSectionMap = {
    // Personal details fields
    first: 'name',
    last: 'name',
    middle: 'name',
    day: 'dob',
    month: 'dob',
    year: 'dob',
    personalEmail: 'email',
    personalTelephone: 'phone',
    personalMobile: 'phone',
    address1: 'address',
    address2: 'address',
    address3: 'address',
    city: 'address',
    county: 'address',
    postcode: 'address',
    country: 'address'
  }

  const uniqueSections = new Set()

  for (const error of errorDetails) {
    // Handle field-level errors
    if (error.path && error.path.length > 0) {
      const section = errorFieldToSectionMap[error.path[0]]
      if (section) {
        uniqueSections.add(section)
      }
    } else if (error.type === 'object.missing' && error.context?.peers) {
      // Handle object-level errors (e.g., at least one field required)
      // Map the first peer to its section
      const firstPeer = error.context.peers[0]
      const section = errorFieldToSectionMap[firstPeer]
      if (section) {
        uniqueSections.add(section)
      }
    }
  }

  return Array.from(uniqueSections).sort((a, b) => a.localeCompare(b))
}
