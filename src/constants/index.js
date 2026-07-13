// Validation constraints
import {
  FIRST_NAME_MAX,
  LAST_NAME_MAX,
  MIDDLE_NAMES_MAX,
  BUSINESS_NAME_MAX,
  EMAIL_MAX,
  PHONE_NUMBER_MIN,
  PHONE_NUMBER_MAX,
  MAX_AGE_YEARS,
  ADDRESS_LINE_MAX,
  TOWN_CITY_MAX,
  COUNTY_MAX,
  COUNTRY_MAX,
<<<<<<< HEAD
  POSTCODE_MAX,
} from './validation-fields.js'

// HTTP status codes
import {
  BAD_REQUEST,
  UNAUTHORIZED,
  FORBIDDEN,
  NOT_FOUND,
  OK,
  NO_CONTENT,
  FOUND,
  INTERNAL_SERVER_ERROR,
  SERVICE_UNAVAILABLE
} from './status-codes.js'

// Format patterns and mappings
import { PHONE_NUMBER_PATTERN } from './patterns.js'
import { MONTH_MAP } from './month-map.js'

export const constants = {
  statusCodes: {
    BAD_REQUEST,
    UNAUTHORIZED,
    FORBIDDEN,
    NOT_FOUND,
    OK,
    NO_CONTENT,
    FOUND,
    INTERNAL_SERVER_ERROR,
    SERVICE_UNAVAILABLE
  },
  validationFields: {
    FIRST_NAME_MAX,
    LAST_NAME_MAX,
    MIDDLE_NAMES_MAX,
    BUSINESS_NAME_MAX,
    EMAIL_MAX,
    PHONE_NUMBER_MIN,
    PHONE_NUMBER_MAX,
    MAX_AGE_YEARS,
    ADDRESS_LINE_MAX,
    TOWN_CITY_MAX,
    COUNTY_MAX,
    COUNTRY_MAX,
    POSTCODE_MAX
  },
  patterns: {
    PHONE_NUMBER_PATTERN
  },
  monthMap: MONTH_MAP
}
=======
  POSTCODE_MAX
} from './validation-fields.js'

export { PHONE_NUMBER_PATTERN } from './patterns.js'
export { MONTH_MAP } from './month-map.js'
>>>>>>> origin/main
